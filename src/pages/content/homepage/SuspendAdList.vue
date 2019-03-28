<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页模块</el-breadcrumb-item>
      <el-breadcrumb-item>悬浮广告</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px;">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item>
          <el-button type="danger" @click="handleAdd()">新增</el-button>
        </el-form-item>

        <el-form-item label="活动类型" prop="activity_type">
          <el-select v-model="searchForm.activity_type" placeholder="请选择">
            <el-option v-for="item in activityTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
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
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>

              <el-form-item label="图片">
                <img :src="props.row.icon_url" style="max-height: 300px;max-width: 100px">
              </el-form-item>

              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>

              <el-form-item label="上线时间">
                <span>{{ props.row.uptime }}</span>
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

        <el-table-column prop="activity_type" label="活动类型" :formatter="activityTypeFormat" align="center">
        </el-table-column>

        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px;">{{ scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图标预览" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img :src="scope.row.icon_url" style="max-height: 200px;max-width: 200px" />
              <img slot="reference" :src="scope.row.icon_url" :alt="scope.row.icon_url"
                style="max-height: 50px;max-width: 50px">
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column label="上线时间" align="center" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px;">{{ scope.row.uptime}}</span>
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
      <el-dialog title="悬浮广告" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="活动类型" label-width="120px" prop="activity_type">
            <el-select v-model="editForm.activity_type" placeholder="请选择">
              <el-option v-for="item in activityTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标题" label-width="120px" prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px" prop="icon_url">
            <el-input v-model="editForm.icon_url" placeholder="请输入图片链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="上线时间" label-width="120px">
            <el-date-picker v-model="editForm.uptime" type="datetime" placeholder="选择日期时间" align="right">
            </el-date-picker>
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
    requestSuspendAdQuery,
    requestSuspendAdAdd,
    requestSuspendAdUpdate,
    requestSuspendAdDelete
  } from "@/api/content/homepage/suspendad"
  import {
    GetActivityTypeFormat
  } from "../../../utils/common.js"
  let moment = require("moment")
  export default {

    name: 'PopupList',
    data() {
      return {
        tableData: [],
        activityTypeOptions: [{
          label: '所有用户',
          value: 0
        }, {
          label: '未注册登录',
          value: 1
        }, {
          label: '已注册但是没有购买首单',
          value: 2
        }, {
          label: '已完成首单非VIP用户',
          value: 3
        }, {
          label: 'VIP用户',
          value: 4
        }, {
          label: '注册有礼',
          value: 5
        }],
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        listLoading: false,
        dialogFormVisible: false,
        labelPosition: 'left',
        searchForm: {
          activity_type: '',
          status: '',
          keywords: '',
        },
        editForm: {
          index: -1,
          id: 0,
          activity_type: '',
          title: '',
          icon_url: '',
          jump_url: '',
          uptime: '',
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        },
        editFormRules: {
          activity_type: {
            required: true,
            message: '请选择活动类型',
            trigger: 'change'
          },
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
          activity_type: '',
          status: '',
          keywords: '',
        }
        this.getData()
      },
      //   获取列表数据 start
      getData() {
        this.listLoading = true
        requestSuspendAdQuery(this.searchForm).then((res) => {
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
      //   活动类型格式化 start
      activityTypeFormat: function (row, column) {
        return GetActivityTypeFormat(row[column.property])
      },
      //   活动类型格式化 end

      //   提交编辑 start
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = {
              marketing_type: 'suspension',
              activity_type: this.editForm.activity_type,
              title: this.editForm.title,
              icon_url: this.editForm.icon_url,
              jump_url: this.editForm.jump_url,
              uptime: moment(this.editForm.uptime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
              is_show: this.editForm.show_status ? 1 : 0,
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addPopup(newData)
            } else {
              newData.id = this.editForm.id
              this.updatePopup(newData)
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
          activity_type: '',
          title: '',
          icon_url: '',
          jump_url: '',
          uptime: start,
          show_status: true,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }

        this.dialogFormVisible = true
      },
      addPopup(newData) {
        console.log("add newData:", newData)
        requestSuspendAdAdd(newData).then(res => {
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
          activity_type: row.activity_type,
          title: row.title,
          icon_url: row.icon_url,
          jump_url: row.jump_url,
          uptime: new Date(row.uptime),
          show_status: row.is_show == 1 ? true : false,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc
        }
        this.dialogFormVisible = true
      },
      updatePopup(newData) {
        console.log("update newData:", newData)
        requestSuspendAdUpdate(newData).then(data => {
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
          requestSuspendAdDelete(delData).then(data => {
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
