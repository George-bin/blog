// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// jQuery
/* eslint-disable */
import $ from 'jquery'
/* eslint-disable */

// 初始化css
import './assets/css/init.css'
import './assets/css/iconfont/iconfont.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/index.css'

// highlight
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件

import './utils/filterExtend'

// 引入moment
import moment from 'moment'
Vue.prototype.$moment = moment // 赋值使用

// 返回顶部动画
Vue.prototype.$backtop = function() {
  $(window).scrollTop(0);
}
Vue.prototype.$backtopAni = function() {
  $('html,body').animate({'scrollTop': 0}, 500)
}

// 语法高亮
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
