import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './mock/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import './assets/css/common.scss'
/* 1. 导入国际化相关依赖 */
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.config.productionTip = false
Mock.mockData()

/* vue-i18n */
Vue.use(VueI18n)
// 2.1 支持两种语言，每种语言需要合并自己书写的语言文件和element-ui的同语言文件
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
// 2.2 加载用户语言设置，你也可以把此值存放在后台
const lang = localStorage.getItem('user-language') || 'zh-cn'
// 2. 实例化VueI18n
const i18n = new VueI18n({
  locale: lang, // 2.2
  messages // 2.1
})

/* element-ui */
Vue.use(ElementUI, {
  // 3. element-ui默认支持vue-i18n@5.x版本，6.x以上的版本需要添加此配置项，当前已8.x
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueScroll, {
  ops: {
    bar: {
      background: '#C0C4CC'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n, // 4. 将i18n挂载到根实例
  render: h => h(App)
})
