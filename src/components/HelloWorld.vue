<template>
  <div class="hello">
    <el-button @click="getUserInfo">按钮</el-button>
    <div v-if="$route.meta.permission.includes('delete')">
      <el-button>删除</el-button>
    </div>
  </div>


</template>

<script>
  import {
    requestUserInfo
  } from '../api/user'
  export default {
    name: 'chenqq',
    methods: {
      getUserInfo() {
        requestUserInfo({
          'name': 'chenqq'
        }).then(data => this.$alert(data))
      }
    }
  }

</script>
