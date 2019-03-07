<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>文案模块</el-breadcrumb-item>
      <el-breadcrumb-item>启动页</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" style="max-height:600px;max-width: 200px" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url" style="max-height:150px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="start_time" label="开始时间" :formatter="dateFormat" align="center"></el-table-column>
        <el-table-column prop="end_time" label="结束时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.is_show}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {
    requestStartPageQuery
  } from "@/api/content/copywriter/startpage"
  export default {
    name: 'StartPageList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        searchForm: {

        },
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getData()
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestStartPageQuery(this.searchForm).then((res) => {
          this.$message({
            'message': '查询成功',
            'type': 'success'
          })
          this.pageTotal = res.data.length
          this.tableData = res.data

          this.listLoading = false
        })

      },
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      //   获取列表数据 end
      //   列表时间格式化 start
      dateFormat: function (row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ""
        }
        let moment = require("moment")
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      //     列表时间格式化 end
    },
    mounted() {
      this.getData()
    }
  }

</script>
