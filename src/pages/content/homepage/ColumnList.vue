<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
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
        <el-table-column label="栏目名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.sort}}</span>
          </template>
        </el-table-column>

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
    requestColumnQuery
  } from "@/api/content/homepage/column"
  export default {
    name: 'ColumnList',
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
        requestColumnQuery(this.searchForm).then((res) => {
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
