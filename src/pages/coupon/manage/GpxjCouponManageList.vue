<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券模块</el-breadcrumb-item>
      <el-breadcrumb-item>先机优惠券管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">

        <el-form-item label="优惠券类型" prop="type">
          <el-select v-model="searchForm.type" placeholder="请选择">
            <el-option label="现金券" value="1"></el-option>
            <el-option label="体验券" value="2"></el-option>
            <el-option label="首单券" value="3"></el-option>
            <el-option label="折扣券" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优惠券ID" prop="coupon_id">
          <el-input v-model="searchForm.coupon_id" placeholder="优惠券ID"></el-input>
        </el-form-item>

        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="searchForm.keyword" placeholder="关键字"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('searchForm')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSubmit()">重置</el-button>
        </el-form-item>
      </el-form>


      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column type="expand" style="width: 100%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="优惠券类型">
                <span v-if="props.row.type==1">现金券</span>
                <span v-else-if="props.row.type==2">体验券</span>
                <span v-else-if="props.row.type==3">首单券</span>
                <span v-else-if="props.row.type==4">折扣券</span>
              </el-form-item>

              <el-form-item label="优惠券ID">
                <span>{{ props.row.coupon_id }}</span>
              </el-form-item>
              <el-form-item label="优惠券名称">
                <span>{{ props.row.coupon_name }}</span>
              </el-form-item>
              <el-form-item label="优惠券描述">
                <span>{{ props.row.coupon_desc }}</span>
              </el-form-item>


              <el-form-item label="体验天数">
                <span>{{ props.row.days_add }}</span>
              </el-form-item>
              <el-form-item label="最低消费金额">
                <span>{{ props.row.min_payment }}</span>
              </el-form-item>
              <el-form-item label="优惠金额">
                <span>{{ props.row.amount_sub }}</span>
              </el-form-item>

              <el-form-item label="领取开始时间">
                <span>{{ props.row.start_time }}</span>
              </el-form-item>
              <el-form-item label="领取结束时间">
                <span>{{ props.row.end_time }}</span>
              </el-form-item>

              <el-form-item label="折扣">
                <span v-if="props.row.discount!=0">{{ props.row.discount}}折</span>
              </el-form-item>

              <el-form-item label="优惠券有效期的类型">
                <span v-if="props.row.exp_type==1">有效期为领取日加该字段的天数</span>
                <span v-else-if="props.row.exp_type==2">有效期为该字段时间点之前</span>
              </el-form-item>

              <el-form-item label="有效天数">
                <span>{{ props.row.exp_add_days}}</span>
              </el-form-item>

              <el-form-item label="使用截止时间">
                <span>{{ props.row.exp_end_date}}</span>
              </el-form-item>

              <el-form-item label="状态">
                <el-tag v-if="props.row.enable == 1">显示</el-tag>
                <el-tag type="danger" v-else>隐藏</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="优惠券类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1" style="margin-left:10px;">现金券</span>
            <span v-else-if="scope.row.type==2" style="margin-left:10px;">体验券</span>
            <span v-else-if="scope.row.type==3" style="margin-left:10px;">首单券</span>
            <span v-else-if="scope.row.type==4" style="margin-left:10px;">折扣券</span>
          </template>
        </el-table-column>

        <el-table-column label="优惠券ID" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.coupon_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="优惠券名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.coupon_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠券描述" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.coupon_desc}}</span>
          </template>
        </el-table-column>



        <el-table-column label="领取开始时间" align="center" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px;">{{ scope.row.start_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="领取结束时间" align="center" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px;">{{ scope.row.end_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enable == 1">显示</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
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
    requestGpxjCouponQuery
  } from "@/api/coupon/manage"
  export default {
    name: 'GpxjCouponManageList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        searchForm: {
          coupon_id: '',
          keyword: '',
          type: '',
          status: ''
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
      resetSubmit() {
        this.searchForm = {
          coupon_id: '',
          keyword: '',
          type: '',
          status: ''
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestGpxjCouponQuery(this.searchForm).then((res) => {
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
<style>
  .demo-table-expand {
    margin-left: 10px;
    font-size: 0;
  }

  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 80%;
  }

</style>
