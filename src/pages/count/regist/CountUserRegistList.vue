<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计</el-breadcrumb-item>
      <el-breadcrumb-item>用户注册</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">

        <el-radio-group v-model="searchForm.group" @change="changeSearch">
          <el-radio-button label="day">按天查询</el-radio-button>
          <el-radio-button label="month">按月查询</el-radio-button>
        </el-radio-group>

        <el-date-picker v-model="searchForm.dateRange" type="daterange" align="right" unlink-panels range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerDateOptions" @change="changeSearch">
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSubmit()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        show-summary style="width: 100%">
        <el-table-column label="注册日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.regist_date}}</span>
          </template>
        </el-table-column>

        <el-table-column label="注册人数" align="center" prop="user_num">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.user_num}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {
    requestCountUserRegistQuery
  } from '@/api/count/userregist'
  let moment = require("moment")

  export default {
    name: 'CountUserRegistList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        pickerDateOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        searchForm: {
          dateRange: [new Date(), new Date()],
          group: 'day'
        }
      }
    },
    methods: {
      // 查询
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
          dateRange: [new Date(), new Date()],
          group: 'day'
        }
        this.getData()
      },
      getData() {
        this.listLoading = true

        let condition = {
          start_date: '',
          end_date: '',
          group: this.searchForm.group
        }

        if (this.searchForm.dateRange && this.searchForm.dateRange.length == 2) {
          condition.start_date = moment(this.searchForm.dateRange[0]).utcOffset(8).format('YYYY-MM-DD')
          condition.end_date = moment(this.searchForm.dateRange[1]).utcOffset(8).format('YYYY-MM-DD')
        }
        requestCountUserRegistQuery(condition).then((res) => {
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
      //   查询 end
      //   修改查询条件 start
      changeSearch() {
        this.getData()
      }
      //   修改查询条件 end

    },
    mounted() {
      this.getData()
    }
  }

</script>
