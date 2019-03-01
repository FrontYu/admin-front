<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules">
        <el-form-item label="名称：" prop="param1">
          <el-input v-model="formInline.param1" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="param2">
          <el-select v-model="formInline.param2" placeholder="用户名">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="spring" value="spring"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.realname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>手机号: {{ scope.row.phone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.phone }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

      <!-- 编辑界面 -->
      <!-- 弹窗 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" label-width="120px">
            <el-input v-model="form.realname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" label-width="120px">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="120px">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    requestSysUserQuery
  } from '@/api/sys/user'
  export default {
    name: 'SysUserList',
    data() {
      return {
        formInline: {
          param1: '',
          param2: ''
        },
        tableData: [],
        rules: {
          param1: [{
              required: true,
              message: '请输入',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          param2: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }]
        },
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        dialogFormVisible: false,
        listLoading: false,
        form: {
          realname: '',
          username: '',
          email: '',
          phone: '',
          index: 0
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getUser()
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      getUser() {
        this.listLoading = true
        requestSysUserQuery(this.formInline).then((res) => {
          this.$message({
            'message': '查询成功',
            'type': 'success'
          })
          this.pageTotal = res.data.length
          this.tableData = res.data

          this.listLoading = false
        })
      },
      //   新增
      handleAdd() {
        this.form = {
          realname: '',
          username: '',
          email: '',
          phone: '',
          index: -1
        }
        this.dialogFormVisible = true
      },
      addUser() {
        let newData = {
          realName: this.form.realname,
          userName: this.form.username,
          email: this.form.email,
          phone: this.form.phone,
          index: this.tableData.length
        }

        this.tableData.push(newData)
        this.pageTotal = this.tableData.length
        this.dialogFormVisible = false

        this.$message({
          message: '操作成功！',
          type: 'success'
        })
      },
      //   修改
      handleEdit(index, row) {
        this.form.index = index + (this.currentPage - 1) * this.pageSize
        this.form.realname = row.realname
        this.form.username = row.username
        this.form.email = row.email
        this.form.phone = row.phone
        this.dialogFormVisible = true
      },
      editUser() {
        this.tableData[this.form.index].realname = this.form.realname
        this.tableData[this.form.index].username = this.form.username
        this.tableData[this.form.index].email = this.form.email
        this.tableData[this.form.index].phone = this.form.phone
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
      },
      //   提交编辑
      submitEdit() {
        console.log("index", this.form.index)
        if (this.form.index === -1) {
          this.addUser()
        } else {
          this.editUser()
        }
      },
      handleDelete(index, row) {
        this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
        this.pageTotal = this.tableData.length
        this.$message({
          message: '删除' + row.realName + '成功',
          type: 'success'
        })
      },
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }
    },
    mounted() {
      this.getUser()
    }
  }

</script>
