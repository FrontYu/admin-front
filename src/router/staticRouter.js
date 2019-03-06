import TheLayout from '@/pages/layout/TheLayout'
import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'
import FuncHome from '@/pages/functions/home/FuncHome'
import FuncTable from '@/pages/functions/table/FuncTable'
import FuncUserPassword from '@/pages/functions/user/FuncUserPassword'
import FuncAbout from '@/pages/functions/about/FuncAbout'
import FuncFormsBase from '@/pages/functions/forms/FuncFormsBase'
import FuncFormsEdit from '@/pages/functions/forms/FuncFormsEdit'

import SysUserList from '@/pages/sys/user/SysUserList'
import SysReviewList from '@/pages/sys/review/SysReviewList'

import CountOrderList from '@/pages/count/order/CountOrderList'
import CountRegistList from '@/pages/count/regist/CountRegistList'

import UserManageList from '@/pages/user/manage/UserManageList'
import UserServiceList from '@/pages/user/service/UserServiceList'
import UserFeedbackList from '@/pages/user/feedback/UserFeedbackList'

import CouponManageList from '@/pages/coupon/manage/CouponManageList'
import CouponActivityList from '@/pages/coupon/activity/CouponActivityList'
import CouponReceiveRecordList from '@/pages/coupon/record/CouponReceiveRecordList'

import ProductManageList from '@/pages/product/manage/ProductManageList'
import ProductPriceList from '@/pages/product/price/ProductPriceList'
import PackageProductList from '@/pages/product/package/PackageProductList'
import RecommendProductList from '@/pages/product/recommend/RecommendProductList'


/** 静态页面路由 */
const staticRouter = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/login',
  name: '登录',
  component: AppLogin
}, {
  path: '/register',
  name: '注册',
  component: AppRegister
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  children: [{
    path: '/index',
    alias: '/home',
    name: 'menu.home',
    icon: 'el-icon-menu',
    component: FuncHome
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  children: [{
    path: '/table',
    name: 'menu.table',
    icon: 'el-icon-search',
    component: FuncTable
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.form',
  icon: 'el-icon-tickets',
  children: [{
    path: '/forms/base',
    name: 'menu.formBase',
    component: FuncFormsBase
  }, {
    path: '/forms/edit',
    name: 'menu.richText',
    component: FuncFormsEdit
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: false,
  name: 'menu.settings',
  icon: 'el-icon-setting',
  children: [{
    path: '/user/password',
    name: 'menu.modifyPass',
    component: FuncUserPassword
  }, ]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  children: [{
    path: '/about',
    name: 'menu.about',
    icon: 'el-icon-star-off',
    component: FuncAbout
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.sys',
  icon: 'el-icon-setting',
  children: [{
    path: '/sys/user/list',
    name: 'menu.sysUserManage',
    component: SysUserList
  }, {
    path: '/sys/review/list',
    name: 'menu.reviewManage',
    component: SysReviewList
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.count',
  icon: 'el-icon-setting',
  children: [{
      path: '/count/order/list',
      name: 'menu.countOrder',
      component: CountOrderList
    },
    {
      path: '/count/regist/list',
      name: 'menu.countRegist',
      component: CountRegistList
    }
  ]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.user',
  icon: 'el-icon-setting',
  children: [{
    path: '/user/manage/list',
    name: 'menu.userManage',
    component: UserManageList
  }, {
    path: '/user/service/list',
    name: 'menu.userService',
    component: UserServiceList
  }, {
    path: '/user/feedback/list',
    name: 'menu.userFeedback',
    component: UserFeedbackList
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.coupon',
  icon: 'el-icon-setting',
  children: [{
    path: '/coupon/manage/list',
    name: 'menu.couponManage',
    component: CouponManageList
  }, {
    path: '/coupon/activity/list',
    name: 'menu.couponActivity',
    component: CouponActivityList
  }, {
    path: '/coupon/record/list',
    name: 'menu.couponRecord',
    component: CouponReceiveRecordList
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.product',
  icon: 'el-icon-setting',
  children: [{
    path: '/product/manage/list',
    name: 'menu.productManage',
    component: ProductManageList
  }, {
    path: '/product/price/list',
    name: 'menu.productPrice',
    component: ProductPriceList
  }, {
    path: '/product/package/list',
    name: 'menu.packageProduct',
    component: PackageProductList
  }, {
    path: '/product/recommend/list',
    name: 'menu.recommendProduct',
    component: RecommendProductList
  }]
}, {
  path: '/error/401',
  name: '错误401',
  component: AppError401
}, {
  path: '*',
  name: '错误404',
  component: AppError404
}]

export default staticRouter
