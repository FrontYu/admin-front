<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-card style="margin-top: 20px;">
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
    <!-- </el-card> -->

    <!-- 列表 -->
    <!-- <el-card style="margin-top: 20px;"> -->
      <el-table  ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>

      <!-- 编辑界面 -->
      <!-- 弹窗 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" label-width="120px">
            <el-input v-model="form.realName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" label-width="120px">
            <el-input v-model="form.userName" auto-complete="off"></el-input>
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
          <el-button type="primary" @click="modifyUser()">确 定</el-button>
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
          param1: '条件1',
          param2: 'admin'
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
        form: {
          realName: '',
          userName: '',
          email: '',
          phone:'',
          index: 0
        }
        }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestSysUserQuery(this.formInline).then((res) =>{
              this.$message({
                'message':'查询成功',
                'type':'success'
              })
              this.pageTotal = res.data.length
              this.tableData = res.data
            })
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      handleAdd(){
        this.form ={
          realName: '',
          userName: '',
          email: '',
          phone:'',
          index: 0
        }
         this.dialogFormVisible = true
      },
      handleEdit(index, row) {
        this.form.index = index + (this.currentPage - 1) * this.pageSize
        this.form.realName = row.realName
        this.form.userName = row.userName
        this.form.email = row.email
        this.form.phone = row.phone
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
        this.pageTotal = this.tableData.length
        this.$message({
          message: '删除' + row.realName + '成功',
          type: 'success'
        })
      },
      handleSizeChange(size){
        this.pageSize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      modifyUser() {
        this.tableData[this.form.index].realName = this.form.realName
        this.tableData[this.form.index].userName = this.form.userName
        this.tableData[this.form.index].email = this.form.email
        this.tableData[this.form.index].phone = this.form.phone
        this.dialogFormVisible = false
        this.$message({
          message: '修改' + this.form.name + '成功！',
          type: 'success'
        })
      }
    }
  }

</script>
