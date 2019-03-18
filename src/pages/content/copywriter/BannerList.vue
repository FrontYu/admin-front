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
        <el-table-column type="expand" style="width: 100%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="位置">
                <span>{{ props.row.place }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <img :src="props.row.image_url" style="max-height: 100px;max-width: 300px">
              </el-form-item>
              <el-form-item label="跳转地址">
                <span>{{ props.row.jump_url }}</span>
              </el-form-item>
              <el-form-item label="活动名称">
                <span>{{ props.row.activity_name }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <el-tag v-if="props.row.is_show == 1">显示</el-tag>
                <el-tag type="danger" v-else>隐藏</el-tag>
                <el-tag type="danger" v-if="props.row.in_review == 1">审核</el-tag>
              </el-form-item>
              <el-form-item label="上线时间">
                <span>{{ props.row.uptime }}</span>
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
            <el-popover placement="right" title trigger="hover">
              <img :src="scope.row.image_url" style="max-height: 200px;max-width: 600px">
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
        <el-form :label-position="labelPosition" :model="editForm" :rules="editFormRules" ref="editForm" align="left"
          style="margin-left:20%;">
          <el-form-item label="位置" label-width="120px" prop="place">
            <el-select v-model="editForm.place" filterable placeholder="请选择" @change="currentPalceSelect">
              <el-option v-for="item in placeData" :key="item.id" :label="item.place" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标题" label-width="120px" prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="图片链接" label-width="120px" prop="image_url">
            <el-input v-model="editForm.image_url" placeholder="请输入图片链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="跳转地址" label-width="120px" prop="jump_url">
            <el-input v-model="editForm.jump_url" placeholder="请输入跳转地址链接" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="活动名称" label-width="120px" prop="activity_name">
            <el-input v-model="editForm.activity_name" placeholder="请输入活动名称" style="width:220px"></el-input>
          </el-form-item>

          <el-form-item label="上线时间" label-width="120px">
            <el-date-picker v-model="editForm.uptime" type="datetime" placeholder="选择日期时间" align="right"></el-date-picker>
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
    requestBannerQuery,
    requestBannerPlaceQuery,
    requestBannerAdd,
    requestBannerUpdate,
    requestBannerDelete
  } from "@/api/content/copywriter/banner"
  let moment = require("moment")
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
        placeData: [],
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
          in_review: 1,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        },
        editFormRules: {
          place: {
            required: true,
            message: '请选择轮播图位置',
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
          activity_name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }, ],
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
      //   获取轮播图位置数据 start
      getBannerPlaceData() {
        requestBannerPlaceQuery().then((res) => {
          this.placeData = res.data
        })
      },
      // 获取轮播图位置数据 end
      //   列表时间格式化 start
      dateFormat: function (row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ""
        }
        return moment(date).utcOffset(0).format("YYYY-MM-DD HH:mm:ss")
      },
      //     列表时间格式化 end
      //   列表获取当前选择的产品（服务）
      searchSelect(selectVal) {
        this.searchForm.status = selectVal
      },

      //   提交编辑 start
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = {
              place_id: this.editForm.place_id,
              place: this.editForm.place,
              title: this.editForm.title,
              image_url: this.editForm.image_url,
              jump_url: this.editForm.jump_url,
              activity_name: this.editForm.activity_name,
              uptime: moment(this.editForm.uptime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
              is_show: this.editForm.show_status ? 1 : 0,
              in_review: this.editForm.in_review,
              share_title: this.editForm.share_title,
              share_icon_url: this.editForm.share_icon_url,
              share_url: this.editForm.share_url,
              share_desc: this.editForm.share_desc
            }
            if (this.editForm.index === -1) {
              this.addBanner(newData)
            } else {
              newData.id = this.editForm.id
              this.updateBanner(newData)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //   提交编辑 end
      //   新增轮播图 start
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
          in_review: 1,
          share_title: '',
          share_icon_url: '',
          share_url: '',
          share_desc: ''
        }

        this.dialogFormVisible = true
      },
      addBanner(newData) {
        requestBannerAdd(newData).then(res => {
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
      //   新增轮播图 end
      // 修改轮播图 start
      handleEdit(index, row) {
        this.editForm = {
          index: index + (this.currentPage - 1) * this.pageSize,
          id: row.id,
          place_id: row.place_id,
          place: row.place,
          title: row.title,
          image_url: row.image_url,
          jump_url: row.jump_url,
          activity_name: row.activity_name,
          uptime: new Date(row.uptime),
          show_status: row.is_show == 1 ? true : false,
          in_review: row.in_review,
          share_title: row.share_title,
          share_icon_url: row.share_icon_url,
          share_url: row.share_url,
          share_desc: row.share_desc
        }
        this.dialogFormVisible = true
      },
      updateBanner(newData) {
        requestBannerUpdate(newData).then(data => {
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
      // 修改轮播图 end
      // 编辑页面 轮播图位置选择 start
      currentPalceSelect(selectVal) {
        this.editForm.place_id = selectVal

        this.placeData.forEach(item => {
          if (item.id === this.editForm.place_id) {
            this.editForm.place = item.place
          }
        })
      },
      // 编辑页面 轮播图位置选择 end
      //   删除轮播图 start
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delData = {
            id: row.id
          }
          requestBannerDelete(delData).then(data => {
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
      //   删除轮播图 end

    },
    mounted() {
      this.getData()
      this.getBannerPlaceData()
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
