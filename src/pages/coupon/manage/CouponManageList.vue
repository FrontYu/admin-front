<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券模块</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
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

        <el-table-column label="优惠券类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1" style="margin-left:10px;">现金券</span>
            <span v-else-if="scope.row.type==2" style="margin-left:10px;">体验券</span>
            <span v-else-if="scope.row.type==3" style="margin-left:10px;">首单券</span>
            <span v-else-if="scope.row.type==4" style="margin-left:10px;">折扣券</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enable == 1">启用</el-tag>
            <el-tag type="danger" v-else>停用</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="所属活动" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity}}</span>
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
    requestCouponQuery
  } from "@/api/coupon/manage"
  export default {
    name: 'CouponManageList',
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
        requestCouponQuery(this.searchForm).then((res) => {
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
