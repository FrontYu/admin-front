<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>产品推荐</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>
        <el-form-item label="栏目" prop="column_name">
          <el-select v-model="searchForm.column_name" filterable placeholder="请选择" @change="searchColumnSelect">
            <el-option v-for="item in columnData" :key="item.id" :label="item.column_name" :value="item.id"></el-option>
          </el-select>
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
              <el-form-item label="栏目类型">
                <span>{{ props.row.column_type_name }}</span>
              </el-form-item>
              <el-form-item label="栏目">
                <span>{{ props.row.column_name }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <img :src="props.row.image_url" style="max-height: 100px;max-width: 100px">
              </el-form-item>

              <el-form-item label="产品名称">
                <span>{{ props.row.product_name }}</span>
              </el-form-item>
              <el-form-item label="产品class">
                <span>{{ props.row.product_class }}</span>
              </el-form-item>
              <el-form-item label="产品描述">
                <span>{{ props.row.product_desc }}</span>
              </el-form-item>

              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>
              <el-form-item label="显示价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="订阅人数">
                <span>{{ props.row.subscribe_num }}</span>
              </el-form-item>

              <el-form-item label="排序">
                <span>{{ props.row.sort }}</span>
              </el-form-item>

              <el-form-item label="状态">
                <el-tag v-if="props.row.is_show == 1">显示</el-tag>
                <el-tag type="danger" v-else>隐藏</el-tag>
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

        <el-table-column label="栏目名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.column_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.image_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.image_url" :alt="scope.row.image_url"
                style="max-height: 50px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品class" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_class}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品描述" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_desc}}</span>
          </template>
        </el-table-column>

        <el-table-column label="显示价格" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.price}}</span>
          </template>
        </el-table-column>

        <el-table-column label="订阅人数" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.subscribe_num}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">显示</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
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
      <el-dialog title="首页产品栏目" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="栏目" label-width="120px" prop="column_name">
            <el-select v-model="editForm.column_name" filterable placeholder="请选择" @change="currentColumnSelect">
              <el-option v-for="item in columnData" :key="item.id" :label="item.column_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px" prop="image_url">
            <el-input v-model="editForm.image_url" placeholder="请输入图片链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="产品名称" label-width="120px" prop="product_name">
            <el-input v-model="editForm.product_name" placeholder="请输入产品名称" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="产品class" label-width="120px" prop="product_class">
            <el-input v-model="editForm.product_class" placeholder="请输入产品class" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="产品描述" label-width="120px" prop="product_desc">
            <el-input v-model="editForm.product_desc" placeholder="请输入产品描述" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="显示价格" label-width="120px" prop="price">
            <el-input v-model="editForm.price" placeholder="请输入显示价格" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="订阅人数" label-width="120px" prop="subscribe_num">
            <el-input v-model="editForm.subscribe_num" placeholder="请输入订阅人数" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="排序" label-width="120px" prop="sort">
            <el-input v-model="editForm.sort" placeholder="请输入排序" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="状态" label-width="120px">
            <el-switch v-model="editForm.show_status" active-color="#13ce66" inactive-color="#ff4949" active-text="显示"
              inactive-text="隐藏"></el-switch>
          </el-form-item>

          <el-form-item label="分享标题" label-width="120px">
            <el-input v-model="editForm.share_title" placeholder="分享标题" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="分享图片链接" label-width="120px">
            <el-input v-model="editForm.share_icon_url" placeholder="分享图片链接" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="分享跳转地址" label-width="120px">
            <el-input v-model="editForm.share_url" placeholder="分享跳转地址" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="分享描述" label-width="120px">
            <el-input v-model="editForm.share_desc" placeholder="分享描述" style="width:220px"></el-input>
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
    requestProductColumnQuery,
    requestProductColumnAdd,
    requestProductColumnUpdate,
    requestProductColumnDelete
  } from "@/api/content/homepage/productcolumn"
  import {
    requestColumnQuery,
  } from '@/api/content/homepage/column'
  export default {
    name: 'ProductColumnList',
    data() {
      return {
        tableData: [],
        columnData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        dialogFormVisible: false,
        labelPosition: 'left',
        searchForm: {
          status: '',
          keywords: '',
          column_id: 0,
        },
        editForm: {
          index: -1,
          id: 0,
          column_type_id: 0,
          column_type_name: '',
          column_id: 0,
          column_name: '',
          image_url: '',
          jump_url: '',
          product_name: '',
          product_class: '',
          product_desc: '',
          subscribe_num: 0,
          price: 0,
          sort: 0,
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        },
        editFormRules: {
          column_name: {
            required: true,
            message: '请选择栏目',
            trigger: 'change'
          },
          product_name: {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          },
          product_class: {
            required: true,
            message: '请输入产品class',
            trigger: 'blur'
          },
          product_desc: {
            required: true,
            message: '请输入产品描述',
            trigger: 'blur'
          },
          image_url: [{
            required: true,
            message: '请输入图片链接',
            trigger: 'blur'
          }, {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur'
          }],
          jump_url: [{
            required: true,
            message: '请输入跳转链接',
            trigger: 'blur'
          }, {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur'
          }],
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
          status: '',
          keywords: '',
          column_id: 0,
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestProductColumnQuery(this.searchForm).then((res) => {
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
      //   获取栏目数据 start
      getColumnData() {
        let form = {
          column_type_id: "0",
          column_type_ids: "2,3",
          status: 1
        }
        requestColumnQuery(form).then((res) => {
          this.columnData = res.data
        })
      },
      // 获取栏目数据 end
      //   列表获取当前选择 start 
      searchColumnSelect(selectVal) {
        this.searchForm.column_id = selectVal
      },
      searchSelect(selectVal) {
        this.searchForm.status = selectVal
      },
      // 编辑页面 栏目选择 start
      currentColumnSelect(selectVal) {
        this.editForm.column_id = selectVal

        this.columnData.forEach(item => {
          if (item.id === this.editForm.column_id) {
            this.editForm.column_name = item.column_name
            this.editForm.column_type_id = item.column_type_id
            this.editForm.column_type_name = item.column_type_name
          }
        })
      },
      // 编辑页面 栏目选择 end

      //   提交编辑 start
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = {
              column_type_id: this.editForm.column_type_id,
              column_type_name: this.editForm.column_type_name,
              column_id: this.editForm.column_id,
              column_name: this.editForm.column_name,
              image_url: this.editForm.image_url,
              jump_url: this.editForm.jump_url,
              product_name: this.editForm.product_name,
              product_class: this.editForm.product_class,
              product_desc: this.editForm.product_desc,
              subscribe_num: parseInt(this.editForm.subscribe_num),
              price: parseFloat(this.editForm.price),
              sort: parseInt(this.editForm.sort),
              is_show: this.editForm.show_status ? 1 : 0,
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addProductColumn(newData)
            } else {
              newData.id = this.editForm.id
              this.updateProductColumn(newData)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //   提交编辑 end

      //   新增产品推荐栏目 start
      handleAdd() {
        var start = new Date()
        this.editForm = {
          index: -1,
          id: 0,
          column_id: 0,
          column_name: '',
          image_url: '',
          jump_url: '',
          product_name: '',
          product_class: '',
          product_desc: '',
          subscribe_num: 0,
          price: 0,
          sort: 0,
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }

        this.dialogFormVisible = true
      },
      addProductColumn(newData) {
        requestProductColumnAdd(newData).then(res => {
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
      //   新增产品推荐栏目 end

      // 修改产品推荐栏目 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          column_type_id: row.column_type_id,
          column_type_name: row.column_type_name,
          column_id: parseInt(row.column_id),
          column_name: row.column_name,
          image_url: row.image_url,
          jump_url: row.jump_url,
          product_name: row.product_name,
          product_class: row.product_class,
          product_desc: row.product_desc,
          subscribe_num: row.subscribe_num,
          price: row.price,
          sort: row.sort,
          show_status: row.is_show == 1 ? true : false,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc
        }
        this.dialogFormVisible = true
      },
      updateProductColumn(newData) {
        requestProductColumnUpdate(newData).then(data => {
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
      // 修改产品推荐栏目 end
      //   删除产品推荐栏目 start
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestProductColumnDelete(delData).then(data => {
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
      //   删除产品推荐栏目 end
    },
    mounted() {
      this.getData()
      this.getColumnData()
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
