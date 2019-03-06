<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules">
        <el-form-item label="用户名：" prop="phone">
          <el-input v-model="searchForm.phone" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="searchForm.email" placeholder="邮箱"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSubmit()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.email}}</span>
          </template>
        </el-table-column>

        <el-table-column label="反馈内容" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.content}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operate_time" label="反馈时间" :formatter="dateFormat" align="center"></el-table-column>


        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

    </el-card>
  </div>
</template>

<script>
  import {
    requestUserFeedbackQuery,
    requestUserFeedbackDelete
  } from '@/api/user/feedback'

  export default {
    name: 'UserFeedbackList',
    data() {
      return {
        tableData: [],
        rules: {
          phone: [{
              required: false,
              message: '请输入',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 11,
              message: '长度在 1 到 11 个字符',
              trigger: 'blur'
            }
          ]
        },
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        searchForm: {
          phone: '',
          email: '',
        }
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
      resetSubmit() {
        this.searchForm = {
          phone: '',
          email: '',
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestUserFeedbackQuery(this.searchForm).then((res) => {
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
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestUserFeedbackDelete(delData).then(data => {
            this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
            this.pageTotal = this.tableData.length
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted() {
      this.getData()
    }
  }

</script>
