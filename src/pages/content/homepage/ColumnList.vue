<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="栏目类型" prop="column_type_name">
          <el-select v-model="searchForm.column_type_name" filterable placeholder="请选择" @change="searchSelect">
            <el-option v-for="item in columnTypeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="栏目名称" prop="column_name">
          <el-input v-model="searchForm.column_name" placeholder="栏目名称"></el-input>
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
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="listLoading" border
        style="width: 100%">

        <el-table-column type="expand" style="width: 100%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="栏目类型">
                <span>{{ props.row.column_type_name }}</span>
              </el-form-item>
              <el-form-item label="栏目名称">
                <span>{{ props.row.column_name }}</span>
              </el-form-item>
              <el-form-item label="排序">
                <span>{{ props.row.sort }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <el-tag v-if="props.row.is_show == 1">显示</el-tag>
                <el-tag type="danger" v-else>隐藏</el-tag>
                <el-tag type="danger" v-if="props.row.in_review == 1">审核</el-tag>
              </el-form-item>
              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>
              <el-form-item label="跳转类别ID">
                <span>{{ props.row.jump_id }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="栏目类型" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_type_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="栏目名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.sort}}</span>
          </template>
        </el-table-column>

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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

      <!-- 编辑界面 -->
      <!-- 弹窗 -->
      <el-dialog title="栏目" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="栏目类型" label-width="120px" prop="column_type_name">
            <el-select v-model="editForm.column_type_name" filterable placeholder="请选择"
              @change="currentColumnTypeSelect">
              <el-option v-for="item in columnTypeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="栏目名称" label-width="120px" prop="column_name">
            <el-input v-model="editForm.column_name" placeholder="请输入栏目名称" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="排序" label-width="120px" prop="sort">
            <el-input v-model="editForm.sort" placeholder="请输入排序" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="状态" label-width="120px">
            <el-switch v-model="editForm.show_status" active-color="#13ce66" inactive-color="#ff4949" active-text="显示"
              inactive-text="隐藏"></el-switch>
          </el-form-item>

          <el-form-item label="审核状态" label-width="120px" prop="in_review">
            <el-radio-group v-model="editForm.in_review">
              <el-radio :label="1">审核中</el-radio>
              <el-radio :label="0">非审核</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="跳转类别ID" label-width="120px" prop="jump_id">
            <el-input v-model="editForm.jump_id" placeholder="请输入跳转类别ID" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {
    requestColumnQuery,
    requestColumnAdd,
    requestColumnUpdate,
    requestColumnDelete,
    requestColumnTypeQuery
  } from "@/api/content/homepage/column"
  export default {
    name: 'ColumnList',
    data() {
      return {
        tableData: [],
        columnTypeData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        dialogFormVisible: false,
        labelPosition: 'left',
        searchForm: {
          column_type_id: 0,
          column_name: '',
          status: ''
        },
        editForm: {
          index: -1,
          id: 0,
          column_type_id: 0,
          column_type_name: '',
          column_name: '',
          show_status: true,
          in_review: 1,
          sort: 0,
          jump_id: 0,
          jump_url: '',
        },
        editFormRules: {
          column_type_name: {
            required: true,
            message: '请选择栏目类型',
            trigger: 'change'
          },
          column_name: [{
              required: true,
              message: '请输入栏目名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ],
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
          column_type_id: 0,
          column_name: '',
          status: ''
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestColumnQuery(this.searchForm).then((res) => {
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
      //   获取栏目类型数据 start
      getColumnTypeData() {
        requestColumnTypeQuery().then((res) => {
          this.columnTypeData = res.data
        })
      },
      // 获取栏目类型数据 end
      //   列表获取当前选择 start 
      searchSelect(selectVal) {
        this.searchForm.column_type_id = selectVal
      },
      //   列表获取当前选择 end 

      // 编辑页面 栏目类型选择 start
      currentColumnTypeSelect(selectVal) {
        this.editForm.column_type_id = selectVal

        this.columnTypeData.forEach(item => {
          if (item.id === this.editForm.column_type_id) {
            this.editForm.column_type_name = item.name
          }
        })
      },
      // 编辑页面 栏目类型选择 end

      //   提交编辑 start
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = {
              column_type_id: this.editForm.column_type_id,
              column_type_name: this.editForm.column_type_name,
              column_name: this.editForm.column_name,
              is_show: this.editForm.show_status ? 1 : 0,
              in_review: this.editForm.in_review,
              sort: parseInt(this.editForm.sort),
              jump_id: parseInt(this.editForm.jump_id),
              jump_url: this.editForm.jump_url,
            }
            if (this.editForm.index === -1) {
              this.addColumn(newData)
            } else {
              newData.id = this.editForm.id
              this.updateColumn(newData)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //   提交编辑 end
      //   新增栏目 start
      handleAdd() {
        var start = new Date()
        this.editForm = {
          index: -1,
          id: 0,
          column_type_id: 0,
          column_type_name: '',
          column_name: '',
          show_status: true,
          in_review: 1,
          sort: 0,
          jump_id: 0,
          jump_url: '',
        }

        this.dialogFormVisible = true
      },
      addColumn(newData) {
        requestColumnAdd(newData).then(res => {
          if (0 == res.id) {
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
          this.$message.error('添加异常')
          console.log(err)
        })

      },
      //   新增栏目 end

      // 修改栏目 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          column_type_id: row.column_type_id,
          column_type_name: row.column_type_name,
          column_name: row.column_name,
          show_status: row.is_show == 1 ? true : false,
          in_review: row.in_review,
          sort: row.sort,
          jump_id: row.jump_id,
          jump_url: row.jump_url,
        }
        this.dialogFormVisible = true
      },
      updateColumn(newData) {
        requestColumnUpdate(newData).then(data => {
          this.tableData[this.editForm.index] = newData
          this.dialogFormVisible = false

          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(err => {
          this.$message.error('修改异常')
          console.log(err)
        })
      },
      // 修改栏目 end

      //   删除栏目 start
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestColumnDelete(delData).then(data => {
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
      //   删除栏目 end
    },
    mounted() {
      this.getData()
      this.getColumnTypeData()
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
