<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>产品分类</el-breadcrumb-item>
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
              <el-form-item label="产品分类名称">
                <span>{{ props.row.product_type_name }}</span>
              </el-form-item>
              <el-form-item label="产品分类描述">
                <span>{{ props.row.product_type_desc }}</span>
              </el-form-item>
              <el-form-item label="icon图片">
                <img :src="props.row.small_icon_url" style="max-height: 100px;max-width: 100px">
              </el-form-item>

              <el-form-item label="列表图片">
                <img :src="props.row.list_icon_url" style="max-height: 200px;max-width: 200px">
              </el-form-item>

              <el-form-item label="内部跳转地址">
                <span>{{ props.row.inner_jump_url }}</span>
              </el-form-item>

              <el-form-item label="产品class">
                <span>{{ props.row.product_class }}</span>
              </el-form-item>

              <el-form-item label="排序">
                <span>{{ props.row.sort }}</span>
              </el-form-item>

              <el-form-item label="状态">
                <el-tag v-if="props.row.is_show == 1">显示</el-tag>
                <el-tag type="danger" v-else>隐藏</el-tag>
                <el-tag type="danger" v-if="props.row.in_review == 1">审核</el-tag>
              </el-form-item>

              <el-form-item label="内购产品pid">
                <span>{{ props.row.apple_pay_pid }}</span>
              </el-form-item>
              <el-form-item label="苹果内购价格">
                <span>{{ props.row.apple_pay_price }}</span>
              </el-form-item>
              <el-form-item label="苹果内购VIP价格">
                <span>{{ props.row.apple_pay_vip_price }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="产品分类名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_type_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产品分类描述" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_type_desc}}</span>
          </template>
        </el-table-column>

        <el-table-column label="icon图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.small_icon_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.small_icon_url" :alt="scope.row.small_icon_url"
                style="max-height: 50px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="列表图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.list_icon_url" style="max-height: 200px;max-width: 600px" />
              <img slot="reference" :src="scope.row.list_icon_url" :alt="scope.row.list_icon_url"
                style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_show == 1">显示</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
            <el-tag v-if="scope.row.is_new == 1">新品</el-tag>
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
      <el-dialog title="首页产品分类" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">

          <el-form-item label="产品分类名称" label-width="120px" prop="product_type_name">
            <el-input v-model="editForm.product_type_name" placeholder="请输入产品分类名称" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="产品分类描述" label-width="120px" prop="product_type_desc">
            <el-input v-model="editForm.product_type_desc" placeholder="请输入产品分类描述" style="width:220px"></el-input>
          </el-form-item>


          <el-form-item label="icon图片" label-width="120px" prop="small_icon_url">
            <el-input v-model="editForm.small_icon_url" placeholder="请输入icon图片" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="列表图片" label-width="120px" prop="list_icon_url">
            <el-input v-model="editForm.list_icon_url" placeholder="请输入列表图片" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="内部跳转地址" label-width="120px" prop="inner_jump_url">
            <el-input v-model="editForm.inner_jump_url" placeholder="请输入内部跳转地址" style="width:220px"></el-input>
          </el-form-item>


          <el-form-item label="产品class" label-width="120px">
            <el-input v-model="editForm.product_class" placeholder="请输入产品class" style="width:220px"></el-input>
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


          <el-form-item label="内购产品pid" label-width="120px">
            <el-input v-model="editForm.apple_pay_pid" placeholder="内购产品pid" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="苹果内购价格" label-width="120px">
            <el-input v-model="editForm.apple_pay_price" placeholder="苹果内购价格" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="苹果内购VIP价格" label-width="120px">
            <el-input v-model="editForm.apple_pay_vip_price" placeholder="苹果内购VIP价格" style="width:220px"></el-input>
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
    requestProductClassifyQuery,
    requestProducClassifyAdd,
    requestProductClassifyUpdate,
    requestProductClassifyDelete
  } from "@/api/content/homepage/productclassify"
  export default {
    name: 'ProductClassifyList',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        dialogFormVisible: false,
        labelPosition: 'left',
        searchForm: {
          status: '',
          keywords: '',
        },
        editForm: {
          index: -1,
          id: 0,
          product_type_name: '',
          product_type_desc: '',
          small_icon_url: '',
          list_icon_url: '',
          inner_jump_url: '',
          product_class: '',
          sort: 0,
          show_status: true,
          in_review: 1,
          apple_pay_pid: '',
          apple_pay_price: '',
          apple_pay_vip_price: ''
        },
        editFormRules: {
          product_type_name: {
            required: true,
            message: '产品分类名称',
            trigger: 'blur'
          },
          product_type_desc: {
            required: true,
            message: '产品分类描述',
            trigger: 'blur'
          },
          small_icon_url: [{
            required: true,
            message: '请输入图片链接',
            trigger: 'blur'
          }, {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur'
          }],
          list_icon_url: [{
            required: true,
            message: '请输入列表图片链接',
            trigger: 'blur'
          }, {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur'
          }],
          inner_jump_url: [{
            required: true,
            message: '请输入内部跳转链接',
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
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestProductClassifyQuery(this.searchForm).then((res) => {
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
      //   提交编辑 start
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = {
              product_type_name: this.editForm.product_type_name,
              product_type_desc: this.editForm.product_type_desc,
              small_icon_url: this.editForm.small_icon_url,
              list_icon_url: this.editForm.list_icon_url,
              inner_jump_url: this.editForm.inner_jump_url,
              product_class: this.editForm.product_class,
              sort: parseInt(this.editForm.sort),
              is_show: this.editForm.show_status ? 1 : 0,
              in_review: this.editForm.in_review,
              apple_pay_pid: this.editForm.apple_pay_pid,
              apple_pay_price: this.editForm.apple_pay_price,
              apple_pay_vip_price: this.editForm.apple_pay_vip_price
            }
            if (this.editForm.index === -1) {
              this.addProductClassify(newData)
            } else {
              newData.id = this.editForm.id
              this.updateProductClassify(newData)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //   提交编辑 end
      //   新增 start
      handleAdd() {
        var start = new Date()
        this.editForm = {
          index: -1,
          id: 0,
          product_type_name: '',
          product_type_desc: '',
          small_icon_url: '',
          list_icon_url: '',
          inner_jump_url: '',
          product_class: '',
          sort: 0,
          show_status: true,
          in_review: 1,
          apple_pay_pid: '',
          apple_pay_price: '',
          apple_pay_vip_price: ''
        }

        this.dialogFormVisible = true
      },
      addProductClassify(newData) {
        requestProducClassifyAdd(newData).then(res => {
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
      //   新增 end

      // 修改 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          product_type_name: row.product_type_name,
          product_type_desc: row.product_type_desc,
          small_icon_url: row.small_icon_url,
          list_icon_url: row.list_icon_url,
          inner_jump_url: row.inner_jump_url,
          product_class: row.product_class,
          sort: row.sort,
          show_status: row.is_show == 1 ? true : false,
          in_review: row.in_review,
          apple_pay_pid: row.apple_pay_pid,
          apple_pay_price: row.apple_pay_price,
          apple_pay_vip_price: row.apple_pay_vip_price
        }
        this.dialogFormVisible = true
      },
      updateProductClassify(newData) {
        requestProductClassifyUpdate(newData).then(data => {
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
      // 修改 end

      //   删除 start
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestProductClassifyDelete(delData).then(data => {
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
      //   删除 end
    },
    mounted() {
      this.getData()
    }
  }

</script>
