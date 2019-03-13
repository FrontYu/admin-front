<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品模块</el-breadcrumb-item>
      <el-breadcrumb-item>产品价格</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column label="产品ID" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品class" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_class}}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务期限" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.period==='周' || scope.row.period==='天'" style="margin-left:10px;">
              {{scope.row.service_day}}天
            </span>
            <span v-else style="margin-left:10px;">{{ scope.row.service_month}}个月</span>
          </template>
        </el-table-column>

        <el-table-column label="原价（元）" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="折后价（元）" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.discount_price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员价（元）" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.vip_price}}</span>
          </template>
        </el-table-column>



        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_enable == 1">启用</el-tag>
            <el-tag type="danger" v-else>停用</el-tag>
            <el-tag type="danger" v-if="scope.row.is_show == 0">隐藏</el-tag>
            <el-tag type="danger" v-if="scope.row.is_list_show == 1">列表</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="苹果内购产品" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.apple_pay_pid">{{scope.row.apple_pay_pid}}</el-tag>
            <el-tag type="info" v-if="scope.row.is_consume == 1">支持续费</el-tag>
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {
    requestProductPriceQuery
  } from "@/api/product/price"
  export default {
    name: 'ProductPriceList',
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
        requestProductPriceQuery(this.searchForm).then((res) => {
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
    },
    mounted() {
      this.getData()
    }
  }

</script>
