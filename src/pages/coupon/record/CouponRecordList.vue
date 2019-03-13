<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券模块</el-breadcrumb-item>
      <el-breadcrumb-item>领取记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column label="优惠券ID" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.coupon_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.userid}}</span>
          </template>
        </el-table-column>

        <el-table-column label="来源" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.source}}</span>
          </template>
        </el-table-column>

        <el-table-column label="优惠券活动" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="expired_date" label="失效时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="使用情况" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.consume==0">未使用</el-tag>
            <el-tag type="danger" v-if="scope.row.consume==1">已使用</el-tag>
            <el-tag type="info" v-if="scope.row.consume==2">已赠送</el-tag>
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
    requestCouponRecordQuery
  } from "@/api/coupon/record"
  export default {
    name: 'CouponRecordList',
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
        requestCouponRecordQuery(this.searchForm).then((res) => {
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
    },
    mounted() {
      this.getData()
    }
  }

</script>
