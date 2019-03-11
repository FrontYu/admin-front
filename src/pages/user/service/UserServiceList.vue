<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户服务</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="用户名：" prop="userid">
          <el-input v-model="searchForm.userid" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="服务名" prop="product_name">
          <el-select v-model="searchForm.product_name" filterable placeholder="请选择" @change="searchSelect">
            <el-option v-for="item in productData" :key="item.product_class" :label="item.product_name" :value="item.product_class"></el-option>
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
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.userid}}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务名" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="start_date" label="开始时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column prop="end_date" label="结束时间" :formatter="dateFormat" align="center"></el-table-column>

        <el-table-column label="服务状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enable == 1">服务期内</el-tag>
            <el-tag type="danger" v-else>服务到期</el-tag>
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
      <el-dialog title="服务信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="120px">
            <el-input v-model="form.userid" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="服务名" label-width="120px">
            <el-select v-model="form.product_name" filterable placeholder="请选择" @change="currentSelect">
              <el-option v-for="item in productData" :key="item.product_class" :label="item.product_name" :value="item.product_class"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务时间" label-width="120px">
            <el-date-picker v-model="form.date_range" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" align="right"></el-date-picker>
          </el-form-item>

          <el-form-item label="服务状态" label-width="120px">
            <el-switch v-model="form.status"></el-switch>
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
    requestUserServiceQuery,
    requestUserServiceAdd,
    requestUserServiceUpdate,
    requestUserServiceDelete
  } from '@/api/user/service'
  import {
    requestProductQuery
  } from '@/api/product/product'
  let moment = require("moment")
  export default {
    name: 'UserServiceList',
    data() {
      return {
        tableData: [],
        rules: {
          userid: [{
              required: false,
              message: '请输入',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 11,
              message: '长度在 1 到 11 个字符',
              trigger: 'blur'
            }
          ],
          product_name: [{
            required: false,
            message: '请选择',
            trigger: 'change'
          }]
        },
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        dialogFormVisible: false,
        listLoading: false,
        form: {
          index: -1,
          id: 0,
          userid: '',
          product_name: '',
          start_date: '',
          end_date: '',
          status: false,
          date_range: '',
        },
        productData: [],
        searchForm: {
          userid: '',
          product_class: '',
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
          userid: '',
          product_class: '',
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true,
          requestUserServiceQuery(this.searchForm).then((res) => {
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
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      //     列表时间格式化 end
      //    获取产品（服务）数据 start
      getProductData() {
        requestProductQuery().then((res) => {
          this.productData = res.data
        })
      },
      //    获取产品（服务）数据 end

      //   新增服务 start
      handleAdd() {
        var start = new Date()
        var end = new Date()
        end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
        this.form = {
          index: -1,
          userid: '',
          product_class: 'ztls',
          product_name: '涨停猎手',
          date_range: [start, end]
        }

        this.dialogFormVisible = true
      },
      addService() {
        let newData = {
          id: 0,
          userid: this.form.userid,
          product_class: this.form.product_class,
          product_name: this.form.product_name,
          start_date: moment(this.form.date_range[0]).format("YYYY-MM-DD HH:mm:ss"),
          end_date: moment(this.form.date_range[1]).format("YYYY-MM-DD HH:mm:ss"),
          enable: this.form.status ? 1 : 0
        }
        console.log("add serivce:", newData)
        requestUserServiceAdd(newData).then(res => {
          if (0 === res.id) {
            this.$message.error('添加失败')
          } else {
            newData.id = res.id

            var tmpData = []
            tmpData.push(newData)
            this.tableData.forEach(item => {
              tmpData.push(item)
            })

            this.tableData = tmpData
            this.pageTotal = this.tableData.length
            this.dialogFormVisible = false

            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }

        }).catch(err => {
          console.log(err)
        })
      },
      //   新增服务 end
      //   修改服务 start
      handleEdit(index, row) {
        this.form.index = index + (this.currentPage - 1) * this.pageSize
        this.form.id = row.id
        this.form.userid = row.userid
        this.form.product_class = row.product_class
        this.form.product_name = row.product_name
        this.form.start_date = row.start_date
        this.form.end_date = row.end_date
        this.form.status = row.enable === 1 ? true : false
        this.form.date_range = [new Date(this.form.start_date), new Date(this.form.end_date)]

        this.dialogFormVisible = true
      },
      modifyService() {
        let newData = {
          id: this.form.id,
          product_class: this.form.product_class,
          product_name: this.form.product_name,
          start_date: moment(this.form.date_range[0]).format("YYYY-MM-DD HH:mm:ss"),
          end_date: moment(this.form.date_range[1]).format("YYYY-MM-DD HH:mm:ss"),
          enable: this.form.status ? 1 : 0
        }

        requestUserServiceUpdate(newData).then(data => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData[this.form.index].product_class = newData.product_class
          this.tableData[this.form.index].product_name = newData.product_name
          this.tableData[this.form.index].start_date = newData.start_date
          this.tableData[this.form.index].end_date = newData.end_date
          this.tableData[this.form.index].enable = newData.enable

          this.dialogFormVisible = false
        })

      },
      // 修改服务 end
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestUserServiceDelete(delData).then(data => {
            this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
            this.pageTotal = this.tableData.length
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });




      },
      //   提交编辑
      submitEdit() {
        if (this.form.index === -1) {
          this.addService()
        } else {
          this.modifyService()
        }
      },
      //  弹窗获取当前选择的产品（服务）
      currentSelect(selectVal) {
        this.form.product_class = selectVal

        this.productData.forEach(item => {
          if (item.product_class === this.form.product_class) {
            this.form.product_name = item.product_name
          }
        })
      },
      //   列表获取当前选择的产品（服务）
      searchSelect(selectVal) {
        this.searchForm.product_class = selectVal
      },
    },
    mounted() {
      this.getData()
      this.getProductData()
    }
  }

</script>
