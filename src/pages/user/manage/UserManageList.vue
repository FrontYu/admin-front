<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <!-- <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules">
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
      </el-form> -->
      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.userid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.nickname}}</span>
          </template>
        </el-table-column>

        <el-table-column label="头像" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="生日" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.birthday}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否会员" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_vip == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="会员到期时间" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.vip_end_date}}</span>

          </template>
        </el-table-column>

        <el-table-column prop="regist_time" label="注册时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="版本" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.version}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

    </el-card>
  </div>
</template>

<script>
  import {
    requestUserManageQuery
  } from '@/api/user/manage'

  export default {
    name: 'UserManageList',
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
        requestUserManageQuery(this.searchForm).then((res) => {
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
      //   handleDelete(index, row) {
      //     this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       let delData = {
      //         id: row.id
      //       }
      //       requestUserFeedbackDelete(delData).then(data => {
      //         this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
      //         this.pageTotal = this.tableData.length
      //         this.$message({
      //           message: '删除成功',
      //           type: 'success'
      //         })
      //       })
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       });
      //     });
      //   },
    },
    mounted() {
      this.getData()
    }
  }

</script>
