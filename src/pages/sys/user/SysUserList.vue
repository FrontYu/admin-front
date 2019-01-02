<template>
  <div>
    <!-- 搜索 -->
    <el-card style="margin-top: 20px;">
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules">
        <el-form-item label="名称：" prop="param1">
          <el-input v-model="formInline.param1" placeholder="条件1"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="param2">
          <el-select v-model="formInline.param2" placeholder="条件2">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="spring" value="spring"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card style="margin-top: 20px;">
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
        <el-table-column label="名称">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>用户名: {{ scope.row.mobile }}</p>
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
      <el-pagination background :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>

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
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import requestSysUserQuery from '@/api/sys/user'
  export default {
    name: 'SysUserList',
    data() {
      return {}
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit')
            return false
          }
        })
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
          message: '删除' + row.name + '成功',
          type: 'success'
        })
      }
    }
  }

</script>
