<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>文案模块</el-breadcrumb-item>
      <el-breadcrumb-item>搜索推荐</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column label="推荐类型" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.recommend_type}}</span>
          </template>
        </el-table-column>

        <el-table-column label="股票名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.stock_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="股票代码" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.stock_code}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">是</el-tag>
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
    requestSearchRecommendQuery
  } from "@/api/content/copywriter/searchrecommend"
  export default {
    name: 'SearchRecommendList',
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
        requestSearchRecommendQuery(this.searchForm).then((res) => {
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
