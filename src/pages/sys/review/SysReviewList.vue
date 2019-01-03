<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>发布审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules">
        <el-form-item label="版本：" prop="param1">
          <el-input v-model="formInline.param1" placeholder="版本"></el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="param1">
          <el-input v-model="formInline.param2" placeholder="渠道"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表 -->
      <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.inReview" active-color="#ff4949" inactive-color="#13ce66" inactive-value="0"
              active-value="1" active-text="审核" inactive-text="正常" @change="changeSwitch(scope.$index, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="版本">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.channel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
    </el-card>

    <!-- 编辑界面 -->
    <!-- 弹窗 -->
    <el-dialog title="新增版本" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="版本" label-width="120px">
          <el-input v-model="form.version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道" label-width="120px">
          <el-input v-model="form.channel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否审核" label-width="120px">
          <el-radio-group v-model="form.inReview">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input v-model="form.memo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReview()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    requestSysReviewQuery
  } from '@/api/sys/review'
  export default {
    name: 'SysReviewList',
    data() {
      return {
        formInline: {
          param1: '',
          param2: ''
        },
        tableData: [],
        rules: {},
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        dialogFormVisible: false,
        listLoading: false,
        form: {
          version: '',
          channel: '',
          memo: '',
          inReview: 0,
          index: 0
        }
      }
    },
    watch: {

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
      getData() {
        this.listLoading = true
        requestSysReviewQuery(this.formInline).then((res) => {
          this.$message({
            'message': '查询成功',
            'type': 'success'
          })
          this.pageTotal = res.data.length
          this.tableData = res.data

          this.listLoading = false
        })
      },
      handleDelete(index, row) {
        this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
        this.pageTotal = this.tableData.length
        this.$message({
          message: '删除' + row.realName + '成功',
          type: 'success'
        })
      },
      handleSizeChange(size) {
        this.pageSize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      //   切换审核状态
      changeSwitch(index, row) {
        this.$prompt('请输入YES, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({
          value
        }) => {
          if (value === 'YES') {
            this.$message({
              type: 'success',
              message: '切换成功!'
            })
          } else {
            if ("0" === row.inReview) {
              this.tableData[this.form.index].inReview = "1"
            } else {
              this.tableData[this.form.index].inReview = "0"
            }
            this.$message({
              type: 'info',
              message: '请重新操作!'
            })
          }

        }).catch(() => {
          this,
          $message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      //   新增审核版本
      handleAdd() {
        this.form = {
          version: '',
          channel: '',
          inReview: 1,
          memo: '',
          index: 0
        }
        this.dialogFormVisible = true
      },
      addReview() {

        let newData = {
          version: this.form.version,
          channel: this.form.channel,
          inReview: this.form.inReview + '',
          memo: this.form.memo,
          index: this.tableData.length
        }

        this.tableData.push(newData)
        this.pageTotal = this.tableData.length
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
      }

    },
    mounted() {
      this.getData()
    }
  }

</script>
