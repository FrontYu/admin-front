<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品模块</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">

      <!-- 列表 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="产品名">
                <span>{{ props.row.product_name }}</span>
              </el-form-item>
              <el-form-item label="产品class">
                <span>{{ props.row.product_class }}</span>
              </el-form-item>
              <el-form-item label="产品描述">
                <span>{{ props.row.product_desc }}</span>
              </el-form-item>
              <el-form-item label="产品web详情页链接">
                <span>{{ props.row.product_web_url }}</span>
              </el-form-item>
              <el-form-item label="跳转链接">
                <span>{{ props.row.product_jump_url }}</span>
              </el-form-item>
              <el-form-item label="上线时间">
                <span>{{ props.row.uptime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图标" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.product_image_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.product_image_url" :alt="scope.row.product_image_url" style="max-height: 50px;max-width: 50px">
            </el-popover>
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

        <el-table-column label="所属分类" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_type_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="版本" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.version}}</span>
          </template>
        </el-table-column>

        <el-table-column label="基础订阅数" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.base_subscription}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">

            <el-tag v-if="scope.row.is_show == 1">上架</el-tag>
            <el-tag type="danger" v-else>下架</el-tag>

            <el-tag type="danger" v-if="scope.row.is_package == 1">套餐</el-tag>
            <el-tag v-else>单品</el-tag>

            <el-tag type="danger" v-if="scope.row.is_presale == 1">预售</el-tag>

            <el-tag type="danger" v-if="scope.row.is_new == 1">新品</el-tag>
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
    requestProductManageQuery
  } from "@/api/product/product"
  export default {
    name: 'ProductManageList',
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
        requestProductManageQuery(this.searchForm).then((res) => {
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
