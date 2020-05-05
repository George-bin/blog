// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 初始化css
import './assets/css/init.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/index.css'

// highlight
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件

// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment // 赋值使用

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  }, 200)
})

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
