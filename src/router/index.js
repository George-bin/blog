import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'

// 解决 {_name:""NavigationDuplicated"... start
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 解决 {_name:""NavigationDuplicated"... end

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/article',
      children: [
        {
          path: '/article',
          name: 'Article',
          component: () => import('@/views/Home/ArticleList.vue')
        },
        {
          path: '/article/:id',
          name: 'ArticleContent',
          component: () => import('@/views/Home/ArticleContent.vue')
        }
      ]
    }
  ]
})
