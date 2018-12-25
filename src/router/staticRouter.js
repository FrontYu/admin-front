import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import HelloWord from '@/components/HelloWorld'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'

/** 静态页面路由 */
const staticRouter = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: '登录',
    component: AppLogin
  },
  {
    path: '/register',
    name: '注册',
    component: AppRegister
  },
  {
    path: '/index',
    name: "首页",
    component: HelloWord
  },
  {
    path: '/error/401',
    name: '错误401',
    meta: {
      errorPage: true
    },
    component: AppError401
  },
  {
    path: '*',
    name: '错误404',
    meta: {
      errorPage: true
    },
    component: AppError404
  }

]

export default staticRouter
