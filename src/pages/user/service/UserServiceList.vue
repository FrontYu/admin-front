<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>服务管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.userid}}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="start_date" label="开始时间" :formatter="dateFormat" align="center">
        </el-table-column>

        <el-table-column prop="end_date" label="结束时间" :formatter="dateFormat" align="center">
        </el-table-column>

        <el-table-column label="服务状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.enable=== 1" style="color: green">服务期内</span>
            <span v-else style="color: red">服务到期</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
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
      <el-dialog title="服务信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="120px">
            <el-input v-model="form.userid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务名" label-width="120px">
            <el-input v-model="form.product_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务时间" label-width="120px">
            <el-date-picker v-model="form.date_range" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" align="right">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="服务状态" label-width="120px">
            <el-switch v-model="form.status"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyService()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    requestUserServiceQuery
  } from '@/api/user/service'
  let moment = require("moment");
  export default {
    name: 'UserServiceList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        dialogFormVisible: false,
        listLoading: false,
        form: {
          id: 0,
          userid: '',
          product_name: '',
          start_date: '',
          end_date: '',
          status: false,
          date_range: ''
        }
      }
    },
    methods: {
      getData() {
        this.listLoading = true,
          requestUserServiceQuery().then((res) => {
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
      //时间格式化
      dateFormat: function (row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ""
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },

      //   更改服务
      handleEdit(index, row) {
        this.form.id = row.id
        this.form.userid = row.userid
        this.form.product_name = row.product_name
        this.form.start_date = row.start_date
        this.form.end_date = row.end_date
        if (row.enable === 1) {
          this.form.status = true
        } else {
          this.form.status = false
        }
        this.form.date_range = [new Date(this.form.start_date), new Date(this.form.end_date)]

        this.dialogFormVisible = true
      },
      modifyService() {
        var start_date = moment(this.form.date_range[0]).format("YYYY-MM-DD HH:mm:ss")
        var end_date = moment(this.form.date_range[1]).format("YYYY-MM-DD HH:mm:ss")
        console.log("start_date=", start_date)
        console.log("end_date=", end_date)
      }
    },
    mounted() {
      this.getData()
    }
  }

</script>
