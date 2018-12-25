import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import HelloWord from '@/components/HelloWorld'

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
  }
]

export default staticRouter
