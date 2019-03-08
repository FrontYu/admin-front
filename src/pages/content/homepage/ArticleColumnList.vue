<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column label="栏目类型" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_type_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="栏目" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.nickname}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.icon_url" style="max-height: 200px;max-width: 600px" />
              <img slot="reference" :src="scope.row.icon_url" :alt="scope.row.icon_url" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

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
    requestArticleColumnQuery
  } from "@/api/content/homepage/articlecolumn"
  export default {
    name: 'ArticleColumnList',
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
        requestArticleColumnQuery(this.searchForm).then((res) => {
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
    },
    mounted() {
      this.getData()
    }
  }

</script>
