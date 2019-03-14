<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>文案模块</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="searchForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="activity_name">
          <el-input v-model="searchForm.activity_name" placeholder="活动名称"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="2"></el-option>
            <el-option label="审核" value="3"></el-option>
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
      <el-table stripe :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading"
        border style="width: 100%">
        <el-table-column label="位置" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.place}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" style="max-height: 200px;max-width: 600px" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity_name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="uptime" label="上线时间" sortable :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">显示</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
            <el-tag type="danger" v-if="scope.row.in_review == 1">审核</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

      <!-- 编辑界面 -->
      <!-- 弹窗 -->
      <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" align="left" style="margin-left:20%;">
          <el-form-item label="位置" label-width="120px">
            <el-select v-model="editForm.place" filterable placeholder="请选择">
              <el-option v-for="item in palceData" :key="item.product_class" :label="item.product_name" :value="item.product_class"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标题" label-width="120px">
            <el-input v-model="editForm.title" placeholder="请输入标题" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px">
            <el-input v-model="editForm.image_url" placeholder="请输入图片链接" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="活动名称" label-width="120px">
            <el-input v-model="editForm.activity_name" placeholder="请输入活动名称" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="上线时间" label-width="120px">
            <el-date-picker v-model="editForm.uptime" type="datetime" placeholder="选择日期时间" align="right">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="状态" label-width="120px">
            <el-switch v-model="editForm.show_status" active-text="显示" inactive-text="隐藏"></el-switch>
            <br>
            <el-switch v-model="editForm.review_status" active-text="正常" inactive-text="审核"></el-switch>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {
    requestBannerQuery
  } from "@/api/content/copywriter/banner"
  export default {
    name: 'BannerList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        dialogFormVisible: false,
        searchForm: {
          title: '',
          activity_name: '',
          status: ''
        },
        palceData: [],
        labelPosition: 'left',
        editForm: {
          index: -1,
          id: 0,
          place: '',
          title: '',
          image_url: '',
          jump_url: '',
          activity_name: '',
          uptime: '',
          show_status: true,
          review_status: true
        }
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
          title: '',
          activity_name: '',
          status: '',
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestBannerQuery(this.searchForm).then((res) => {
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
      //   列表获取当前选择的产品（服务）
      searchSelect(selectVal) {
        this.searchForm.status = selectVal
      },

      //   新增轮播图
      handleAdd() {
        var start = new Date()
        this.editForm = {
          index: -1,
          id: 0,
          place: '',
          title: '',
          image_url: '',
          jump_url: '',
          activity_name: '',
          uptime: start,
          show_status: true,
          review_status: true
        }

        this.dialogFormVisible = true
      },
    },
    mounted() {
      this.getData()
    }
  }

</script>
