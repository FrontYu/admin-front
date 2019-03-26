<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>快捷菜单</el-breadcrumb-item>
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
            <el-option label="审核" value="1"></el-option>
            <el-option label="新品" value="2"></el-option>
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
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <img :src="props.row.icon_url" style="max-height: 200px;max-width: 200px">
              </el-form-item>

              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>

              <el-form-item label="产品class">
                <span>{{ props.row.product_class }}</span>
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

        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.icon_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.icon_url" :alt="scope.row.icon_url"
                style="max-height: 50px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_new == 1">新品</el-tag>
            <el-tag type="danger" v-if="scope.row.in_review == 1">审核</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="产品class（审核）" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.product_class}}</span>
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
      <el-dialog title="首页快捷方式" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">

          <el-form-item label="标题" label-width="120px" prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px" prop="icon_url">
            <el-input v-model="editForm.icon_url" placeholder="请输入图片链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="产品class" label-width="120px">
            <el-input v-model="editForm.product_class" placeholder="请输入产品class" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="是否新品" label-width="120px" prop="is_new">
            <el-radio-group v-model="editForm.is_new">
              <el-radio :label="1">新品</el-radio>
              <el-radio :label="0">非新品</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="审核状态" label-width="120px" prop="in_review">
            <el-radio-group v-model="editForm.in_review">
              <el-radio :label="1">审核中</el-radio>
              <el-radio :label="0">非审核</el-radio>
            </el-radio-group>
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
    requestShortCutMenuQuery,
    requestShortCutMenuAdd,
    requestShortCutMenuUpdate,
    requestShortCutMenuDelete
  } from "@/api/content/homepage/shortcutmenu"
  export default {
    name: 'ShortCutMenuList',
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
          title: '',
          icon_url: '',
          jump_url: '',
          product_class: '',
          in_review: 1,
          is_new: 0,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        },
        editFormRules: {
          title: [{
              required: true,
              message: '请输入标题',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          icon_url: [{
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
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestShortCutMenuQuery(this.searchForm).then((res) => {
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
              title: this.editForm.title,
              icon_url: this.editForm.icon_url,
              jump_url: this.editForm.jump_url,
              product_class: this.editForm.product_class,
              in_review: this.editForm.in_review,
              is_new: this.editForm.is_new,
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addShortCutMenu(newData)
            } else {
              newData.id = this.editForm.id
              this.updateShortCutMenu(newData)
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
          title: '',
          icon_url: '',
          jump_url: '',
          product_class: '',
          in_review: 1,
          is_new: 0,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }

        this.dialogFormVisible = true
      },
      addShortCutMenu(newData) {
        requestShortCutMenuAdd(newData).then(res => {
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
          title: row.title,
          icon_url: row.icon_url,
          jump_url: row.jump_url,
          product_class: row.product_class,
          in_review: row.in_review,
          is_new: row.is_new,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc
        }
        this.dialogFormVisible = true
      },
      updateShortCutMenu(newData) {
        requestShortCutMenuUpdate(newData).then(data => {
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
          requestShortCutMenuDelete(delData).then(data => {
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
