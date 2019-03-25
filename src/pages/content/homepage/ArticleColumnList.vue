<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页文章</el-breadcrumb-item>
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
              <el-form-item label="栏目类型">
                <span>{{ props.row.column_type_name }}</span>
              </el-form-item>
              <el-form-item label="栏目">
                <span>{{ props.row.column_name }}</span>
              </el-form-item>

              <el-form-item label="昵称">
                <span>{{ props.row.nickname }}</span>
              </el-form-item>

              <el-form-item label="图片">
                <img :src="props.row.icon_url" style="max-height: 100px;max-width: 100px">
              </el-form-item>

              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
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

        <el-table-column label="昵称（标题）" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.nickname}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.icon_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.icon_url" :alt="scope.row.icon_url"
                style="max-height: 100px;max-width: 100px">
            </el-popover>
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
      <el-dialog title="首页文章栏目" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="栏目" label-width="120px" prop="column_name">
            <el-select v-model="editForm.column_name" filterable placeholder="请选择" @change="currentColumnSelect">
              <el-option v-for="item in columnData" :key="item.id" :label="item.column_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="昵称（标题）" label-width="120px" prop="nickname">
            <el-input v-model="editForm.nickname" placeholder="请输入昵称（标题）" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px" prop="icon_url">
            <el-input v-model="editForm.icon_url" placeholder="请输入图片链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>


          <el-form-item label="内容" prop="content">
            <div class="edit_container">
              <quill-editor v-model="editForm.content" ref="myQuillEditor" class="editer" :options="editorOption"
                @ready="onEditorReady($event)">


                <!-- 自定义toolar -->
                <div id="toolbar" slot="toolbar">
                  <!-- Add a bold button -->
                  <button class="ql-bold" title="加粗">Bold</button>
                  <button class="ql-italic" title="斜体">Italic</button>
                  <button class="ql-underline" title="下划线">underline</button>
                  <button class="ql-strike" title="删除线">strike</button>
                  <button class="ql-blockquote" title="引用"></button>
                  <button class="ql-code-block" title="代码"></button>
                  <button class="ql-header" value="1" title="标题1"></button>
                  <button class="ql-header" value="2" title="标题2"></button>
                  <!--Add list -->
                  <button class="ql-list" value="ordered" title="有序列表"></button>
                  <button class="ql-list" value="bullet" title="无序列表"></button>
                  <!-- Add font size dropdown -->
                  <select class="ql-header" title="段落格式">
                    <option selected>段落</option>
                    <option value="1">标题1</option>
                    <option value="2">标题2</option>
                    <option value="3">标题3</option>
                    <option value="4">标题4</option>
                    <option value="5">标题5</option>
                    <option value="6">标题6</option>
                  </select>
                  <select class="ql-size" title="字体大小">
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px" selected>16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                  </select>
                  <select class="ql-font" title="字体">
                    <option value="SimSun">宋体</option>
                    <option value="SimHei">黑体</option>
                    <option value="Microsoft-YaHei">微软雅黑</option>
                    <option value="KaiTi">楷体</option>
                    <option value="FangSong">仿宋</option>
                    <option value="Arial">Arial</option>
                  </select>
                  <!-- Add subscript and superscript buttons -->
                  <select class="ql-color" value="color" title="字体颜色"></select>
                  <select class="ql-background" value="background" title="背景颜色"></select>
                  <select class="ql-align" value="align" title="对齐"></select>
                  <button class="ql-clean" title="还原"></button>
                  <!-- You can also add your own -->
                </div>
              </quill-editor>
            </div>
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
    requestArticleColumnQuery,
    requestArticleColumnAdd,
    requestArticleColumnUpdate,
    requestArticleColumnDelete
  } from "@/api/content/homepage/articlecolumn"
  import {
    requestColumnQuery
  } from '@/api/content/homepage/column'
  import {
    Quill,
    quillEditor
  } from 'vue-quill-editor' //调用编辑器
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import '../../../assets/css/font.css'


  // 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)

  export default {
    name: 'ArticleColumnList',
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
          column_id: 0,
        },
        editorOption: {
          placeholder: "请输入",
          theme: "snow", // or 'bubble' 
          modules: {
            toolbar: {
              container: '#toolbar'
            }
          }
        },
        editForm: {
          index: -1,
          id: 0,
          column_type_id: 0,
          column_type_name: '',
          column_id: 0,
          column_name: '',
          icon_url: '',
          nickname: '',
          jump_url: '',
          content: '',
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: '',

        },
        editFormRules: {
          column_name: {
            required: true,
            message: '请选择栏目',
            trigger: 'change'
          },
          nickname: {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          },
          content: {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          },
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
          column_id: 0,
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestArticleColumnQuery(this.searchForm).then((res) => {
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
          column_type_ids: "6,7",
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
      //   列表获取当前选择 end  
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
              column_type_id: parseInt(this.editForm.column_type_id),
              column_type_name: this.editForm.column_type_name,
              column_id: parseInt(this.editForm.column_id),
              column_name: this.editForm.column_name,
              nickname: this.editForm.nickname,
              content: this.editForm.content,
              icon_url: this.editForm.icon_url,
              jump_url: this.editForm.jump_url,
              is_show: this.editForm.show_status ? 1 : 0,
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addArticleColumn(newData)
            } else {
              newData.id = this.editForm.id
              this.updateArticleColumn(newData)
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
        this.editForm = {
          index: -1,
          id: 0,
          column_id: 0,
          column_name: '',
          nickname: '',
          content: '',
          icon_url: '',
          jump_url: '',
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }

        this.dialogFormVisible = true
      },
      addArticleColumn(newData) {
        requestArticleColumnAdd(newData).then(res => {
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
      // 新增 end
      // 修改 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          column_type_id: parseInt(row.column_type_id),
          column_type_name: row.column_type_name,
          column_id: parseInt(row.column_id),
          column_name: row.column_name,
          icon_url: row.icon_url,
          jump_url: row.jump_url,
          nickname: row.nickname,
          content: row.content,
          show_status: row.is_show == 1 ? true : false,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc
        }
        this.dialogFormVisible = true
      },
      updateArticleColumn(newData) {
        requestArticleColumnUpdate(newData).then(data => {
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
          requestArticleColumnDelete(delData).then(data => {
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

      onEditorReady(editor) {},
    },

    components: {
      //使用编辑器
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
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

  .edit_container {
    float: right;
    width: 100%;
    height: 250px;
  }

  .editer {
    height: 200px;
  }

</style>
