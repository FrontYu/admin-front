<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>文案模块</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column label="位置" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.place}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" style="max-height: 200px;max-width: 600px" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity_name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="uptime" label="上线时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="是否审核" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.in_review == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
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
    requestBannerQuery
  } from "@/api/content/copywriter/banner"
  export default {
    name: 'BannerList',
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
        requestBannerQuery(this.searchForm).then((res) => {
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
