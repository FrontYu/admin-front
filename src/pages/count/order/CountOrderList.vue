<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计</el-breadcrumb-item>
      <el-breadcrumb-item>订单统计</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-radio-group v-model="searchForm.pay_way" @change="changeSearch">
          <el-radio-button label>全部</el-radio-button>
          <el-radio-button label="AliPAY">支付宝</el-radio-button>
          <el-radio-button label="WXPAY">微信</el-radio-button>
        </el-radio-group>

        <el-form-item label="产品">
          <el-select
            v-model="searchForm.product_class"
            filterable
            placeholder="请选择"
            @change="changeSearch"
          >
            <el-option
              v-for="item in productData"
              :key="item.product_class"
              :label="item.product_name"
              :value="item.product_class"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="订单号">
          <el-input v-model="searchForm.order_id" placeholder="订单号"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="searchForm.userid" placeholder="用户名"></el-input>
        </el-form-item>

        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="订单开始日期"
          end-placeholder="订单结束日期"
          :picker-options="pickerDateOptions"
          @change="changeSearch"
        ></el-date-picker>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSubmit()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <!-- '订单号','支付方式','用户名','产品id','产品class','数量','金额','订单创建时间','服务开始时间','服务结束时间' -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        v-loading="listLoading"
        border
        show-summary
        style="width: 100%"
      >
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

        <el-table-column label="数量" align="center" prop="quantity">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.quantity}}</span>
          </template>
        </el-table-column>

        <el-table-column label="金额（元）" align="center" prop="total_fee">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  requestCountOrderQuery
} from '@/api/count/order'
import {
  requestProductManageQuery
} from "@/api/product/product"
let moment = require("moment")

export default {
  name: 'CountOrderList',
  data() {
    return {
      tableData: [],
      productData: [],
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
        order_id: '',
        pay_way: '',
        userid: '',
        product_class: '',
        dateRange: [new Date(), new Date()],
      },
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
        order_id: '',
        pay_way: '',
        userid: '',
        product_class: '',
        dateRange: [new Date(), new Date()],
      }
      this.getData()
    },
    getData() {
      this.listLoading = true
      let condition = {
        order_id: this.searchForm.order_id,
        pay_way: this.searchForm.pay_way,
        userid: this.searchForm.userid,
        product_class: this.searchForm.product_class,
        start_date: "",
        end_date: ""
      }
      if (this.searchForm.dateRange && this.searchForm.dateRange.length == 2) {
        condition.start_date = moment(this.searchForm.dateRange[0]).utcOffset(8).format('YYYY-MM-DD')
        condition.end_date = moment(this.searchForm.dateRange[1]).utcOffset(8).format('YYYY-MM-DD')
      }

      console.log("condition:", condition)
      requestCountOrderQuery(condition).then((res) => {
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
    //   获取产品数据 start
    getProductData() {
      requestProductManageQuery().then((res) => {
        this.productData = res.data
      })
    },
    //   获取产品数据 end
    //   修改查询条件 start
    changeSearch() {
      this.getData()
    },
    //   修改查询条件 end

  },
  mounted() {
    this.getData()
    this.getProductData()
  }
}

</script>
