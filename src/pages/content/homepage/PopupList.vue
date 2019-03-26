<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>营销弹窗</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="关键字" prop="keyword">
          <el-input v-model="searchForm.keyword" placeholder="关键字"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
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
              <el-form-item label="活动类型">
                <span>{{ props.row.activity_type }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>

              <el-form-item label="图片">
                <img :src="props.row.image_url" style="max-height: 300px;max-width: 100px">
              </el-form-item>

              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>

              <el-form-item label="上线时间">
                <span>{{ props.row.uptime }}</span>
              </el-form-item>

              <el-form-item label="状态">
                <el-tag v-if="props.row.is_new == 1">审核</el-tag>
                <el-tag type="danger" v-if="props.row.in_review == 1">审核</el-tag>
              </el-form-item>

              <el-form-item label="分享标题">
                <span>{{ props.row.share_title }}</span>
              </el-form-item>
              <el-form-item label="分享图片链接">
                <span>{{ props.row.share_icon_url }}</span>
              </el-form-item>
              <el-form-item label="分享跳转地址">
                <span>{{ props.row.share_url }}</span>
              </el-form-item>
              <el-form-item label="分享描述">
                <span>{{ props.row.share_desc }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="activity_type" label="活动类型" :formatter="activityTypeFormat" align="center">
        </el-table-column>

        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" style="max-height: 600px;max-width: 200px" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url"
                style="max-height: 130px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="uptime" label="上线时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">显示</el-tag>
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
    requestPopupQuery,
    requestPopupAdd,
    requestPopupUpdate,
    requestPopupDelete
  } from "@/api/content/homepage/popup"
  import {
    GetActivityTypeFormat
  } from "../../../utils/common.js"
  export default {
    name: 'PopupList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        searchForm: {
          status: '',
          keywords: '',
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
          status: '',
          keywords: '',
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestPopupQuery(this.searchForm).then((res) => {
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
      activityTypeFormat: function (row, column) {
        return GetActivityTypeFormat(row[column.property])
      }
    },
    mounted() {
      this.getData()
    }
  }

</script>
