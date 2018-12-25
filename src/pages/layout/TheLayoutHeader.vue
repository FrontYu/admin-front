<template>
  <el-header class="header">
    <router-link to="/index">
      <div class="logo" :class="{'logo-hide':!openNav}">
        <img src="../../asset/logo.png" class="image" />
        <span class="text"> 管理平台 </span>
      </div>
    </router-link>
    <div class="content">
      <i class="fa fa-align-justify toggle" @click="navOpenToggle" title="显示/隐藏菜单"></i>
    </div>
    <el-dropdown trigger="hover" class="user">
      <span class="user-info">
        {{User_name}}<i class="fa fa-user-circle-o fa-2x" style="margin-left:10px"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
