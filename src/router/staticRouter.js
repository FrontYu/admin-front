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
  path: '/error/401',
  name: '错误401',
  component: AppError401
}, {
  path: '*',
  name: '错误404',
  component: AppError404
}]

export default staticRouter
