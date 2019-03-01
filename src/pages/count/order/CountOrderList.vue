<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计</el-breadcrumb-item>
      <el-breadcrumb-item>订单统计</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <!-- 列表 -->
      <!-- '订单号','支付方式','用户名','产品id','产品class','数量','金额','订单创建时间','服务开始时间','服务结束时间' -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        show-summary style="width: 100%">
        <el-table-column label="订单号">
          <template slot-scope="scope">
            <span>{{ scope.row.order_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.pay_way}}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.userid}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品id">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品class">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_class}}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.quantity}}</span>
          </template>
        </el-table-column>

        <el-table-column label="金额（元）">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.total_fee}}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.create_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="开始时间">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.start_date}}</span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.end_date}}</span>
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
    requestCountOrderQuery
  } from '@/api/count/order'
  export default {
    name: 'CountOrderList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
      }
    },
    methods: {
      getData() {
        this.listLoading = true,
          requestCountOrderQuery().then((res) => {
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
      }
    },
    mounted() {
      this.getData()
    }
  }

</script>
