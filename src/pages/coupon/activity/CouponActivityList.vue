<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券模块</el-breadcrumb-item>
      <el-breadcrumb-item>活动设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动描述" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity_desc}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="uptime" label="上线时间" :formatter="dateFormat" align="center"></el-table-column>
        <el-table-column prop="end_time" label="结束时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show==1">上架</el-tag>
            <el-tag type="danger" v-else>下架</el-tag>
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
    requestCouponActivityQuery
  } from "@/api/coupon/activity"
  export default {
    name: 'CouponActivityList',
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
        requestCouponActivityQuery(this.searchForm).then((res) => {
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
