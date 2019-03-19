<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>文案模块</el-breadcrumb-item>
      <el-breadcrumb-item>搜索推荐</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="推荐类型" prop="status">
          <el-select v-model="searchForm.recommend_type" placeholder="请选择">
            <el-option label="股票" value="stock"></el-option>
            <el-option label="活动" value="activity"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
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
              <el-form-item label="推荐类型">
                <el-tag type="success" v-if="props.row.recommend_type === 'activity'">活动</el-tag>
                <el-tag type="warning" v-if="props.row.recommend_type === 'stock'">股票</el-tag>
              </el-form-item>
              <el-form-item label="股票名称">
                <span>{{ props.row.stock_name }}</span>
              </el-form-item>
              <el-form-item label="股票代码">
                <span>{{ props.row.stock_code }}</span>
              </el-form-item>
              <el-form-item label="活动名称">
                <span>{{ props.row.activity_name }}</span>
              </el-form-item>
              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
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

        <el-table-column label="推荐类型" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.recommend_type === 'activity'">活动</el-tag>
            <el-tag type="warning" v-if="scope.row.recommend_type === 'stock'">股票</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="股票名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.stock_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="股票代码" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.stock_code}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.activity_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.jump_url}}</span>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>

      <!-- 编辑界面 -->
      <!-- 弹窗 -->
      <el-dialog title="搜索推荐" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="推荐类型" label-width="120px" prop="recommend_type">
            <el-select v-model="editForm.recommend_type" filterable placeholder="请选择" @change="changeRecommendType">
              <el-option label="活动" value="activity"></el-option>
              <el-option label="股票" value="stock"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="股票代码" label-width="120px" prop="stock_code">
            <el-input v-model="editForm.stock_code" placeholder="请输入股票代码" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="股票名称" label-width="120px" prop="stock_name">
            <el-input v-model="editForm.stock_name" placeholder="请输入股票名称" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="活动名称" label-width="120px" prop="activity_name">
            <el-input v-model="editForm.activity_name" placeholder="请输入活动名称" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="排序" label-width="120px">
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
    requestSearchRecommendQuery,
    requestSearchRecommendAdd,
    requestSearchRecommendUpdate,
    requestSearchRecommendDelete
  } from "@/api/content/copywriter/searchrecommend"
  export default {
    name: 'SearchRecommendList',
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
          recommend_type: '',
          status: ''
        },
        editForm: {
          index: -1,
          id: 0,
          recommend_type: '',
          stock_name: '',
          stock_code: '',
          jump_url: '',
          activity_name: '',
          sort: 0,
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        },
        editFormRules: {
          recommend_type: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          stock_name: [{
              required: false,
              message: '请输入股票名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ],
          stock_code: [{
              required: false,
              message: '请输入股票代码',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          jump_url: [{
            required: false,
            message: '请输入跳转链接',
            trigger: 'blur'
          }, {
            min: 1,
            max: 255,
            message: '长度在 1 到 255 个字符',
            trigger: 'blur'
          }],
          activity_name: [{
            required: false,
            message: '请输入活动名称',
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
          recommend_type: '',
          status: ''
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestSearchRecommendQuery(this.searchForm).then((res) => {
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
              recommend_type: this.editForm.recommend_type,
              stock_name: this.editForm.stock_name,
              stock_code: this.editForm.stock_code,
              jump_url: this.editForm.jump_url,
              activity_name: this.editForm.activity_name,
              is_show: this.editForm.show_status ? 1 : 0,
              sort: parseInt(this.editForm.sort),
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addSearchRecommend(newData)
            } else {
              newData.id = this.editForm.id
              this.updateSearchRecommend(newData)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //   提交编辑 end
      //   新增搜索推荐 start
      handleAdd() {
        this.editForm = {
          index: -1,
          id: 0,
          recommend_type: '',
          stock_name: '',
          stock_code: '',
          jump_url: '',
          activity_name: '',
          sort: 0,
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }
        this.changeRecommendType()
        this.dialogFormVisible = true
      },
      addSearchRecommend(newData) {
        requestSearchRecommendAdd(newData).then(res => {
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
      //   新增搜索推荐 end
      // 修改搜索推荐 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          recommend_type: row.recommend_type,
          stock_name: row.stock_name,
          stock_code: row.stock_code,
          jump_url: row.jump_url,
          activity_name: row.activity_name,
          sort: row.sort,
          show_status: row.is_show == 1 ? true : false,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc,
        }
        this.changeRecommendType(this.editForm.recommend_type)
        this.dialogFormVisible = true
      },
      updateSearchRecommend(newData) {
        requestSearchRecommendUpdate(newData).then(data => {
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
      // 修改搜索推荐 end
      //   删除搜索推荐 start
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestSearchRecommendDelete(delData).then(data => {
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
      //   删除搜索推荐 end
      //   切换推荐类型 start
      changeRecommendType(selectVal) {
        if (selectVal === 'stock') {
          this.editFormRules.stock_code[0].required = true
          this.editFormRules.stock_name[0].required = true
          this.editFormRules.activity_name[0].required = false
          this.editFormRules.jump_url[0].required = false
        } else if (selectVal === 'activity') {
          this.editFormRules.activity_name[0].required = true
          this.editFormRules.jump_url[0].required = true
          this.editFormRules.stock_code[0].required = false
          this.editFormRules.stock_name[0].required = false
        } else {
          this.editFormRules.stock_code[0].required = false
          this.editFormRules.stock_name[0].required = false
          this.editFormRules.activity_name[0].required = false
          this.editFormRules.jump_url[0].required = false
        }
      },
      //   切换推荐类型 end

    },
    mounted() {
      this.getData()
    }
  }

</script>
