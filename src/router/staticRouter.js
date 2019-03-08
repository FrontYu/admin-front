import TheLayout from '@/pages/layout/TheLayout'
import TheLayoutMain from '@/pages/layout/TheLayoutMain'

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

import BannerList from '@/pages/content/copywriter/BannerList'
import StartPageList from '@/pages/content/copywriter/StartPageList'
import MarketingLabelList from '@/pages/content/copywriter/MarketingLabelList'
import SearchRecommendList from '@/pages/content/copywriter/SearchRecommendList'

import ColumnList from '@/pages/content/homepage/ColumnList'
import ProductColumnList from '@/pages/content/homepage/ProductColumnList'
import SPColumnList from '@/pages/content/homepage/SPColumnList'
import ArticleColumnList from '@/pages/content/homepage/ArticleColumnList'
import AdColumnList from '@/pages/content/homepage/AdColumnList'
import ProductClassifyList from '@/pages/content/homepage/ProductClassifyList'
import ShortCutMenuList from '@/pages/content/homepage/ShortCutMenuList'
import PopupList from '@/pages/content/homepage/PopupList'
import SuspendAdList from '@/pages/content/homepage/SuspendAdList'

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
  name: 'menu.content',
  icon: 'el-icon-info',
  children: [{
    path: '/',
    name: 'menu.copywriter',
    icon: 'el-icon-edit',
    component: TheLayoutMain,
    children: [{
      path: '/content/copywriter/banner/list',
      name: 'menu.bannerManage',
      component: BannerList,
    }, {
      path: '/content/copywriter/startpage/list',
      name: 'menu.startPageManage',
      component: StartPageList,
    }, {
      path: '/content/copywriter/searchrecommend/list',
      name: 'menu.searchRecommend',
      component: SearchRecommendList,
    }, {
      path: '/content/copywriter/marketinglabel/list',
      name: 'menu.marketingLabel',
      component: MarketingLabelList,
    }]
  }, {
    path: '/content/homepage',
    name: 'menu.homepage',
    icon: 'el-icon-menu',
    component: TheLayoutMain,
    children: [{
      path: '/content/homepage/column/list',
      name: 'menu.columnManage',
      component: ColumnList,
    }, {
      path: '/content/homepage/productcolumn/list',
      name: 'menu.productColumn',
      component: ProductColumnList,
    }, {
      path: '/content/homepage/spcolumn/list',
      name: 'menu.stockProductColumn',
      component: SPColumnList,
    }, {
      path: '/content/homepage/articlecolumn/list',
      name: 'menu.articleColumn',
      component: ArticleColumnList,
    }, {
      path: '/content/homepage/adcolumn/list',
      name: 'menu.adColumn',
      component: AdColumnList,
    }, {
      path: '/content/homepage/productclassify/list',
      name: 'menu.productClassify',
      component: ProductClassifyList,
    }, {
      path: '/content/homepage/shortcutmenu/list',
      name: 'menu.shortCutMenu',
      component: ShortCutMenuList,
    }, {
      path: '/content/homepage/popup/list',
      name: 'menu.popup',
      component: PopupList,
    }, {
      path: '/content/homepage/suspendad/list',
      name: 'menu.suspendAd',
      component: SuspendAdList,
    }]
  }]
}, {
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.product',
  icon: 'el-icon-goods',
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
  path: '/',
  component: TheLayout,
  menu: true,
  name: 'menu.coupon',
  icon: 'el-icon-tickets',
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
  name: 'menu.user',
  icon: 'el-icon-star-on',
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
  name: 'menu.count',
  icon: 'el-icon-edit-outline',
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
  path: '/error/401',
  name: '错误401',
  component: AppError401
}, {
  path: '*',
  name: '错误404',
  component: AppError404
}]

export default staticRouter
