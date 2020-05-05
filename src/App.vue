<template>
  <div id="app">
    <main-header></main-header>
    <div class="main-container">
      <router-view/>
    </div>
    <main-footer></main-footer>
    <!-- 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    MainHeader: () => import('@/components/home/main-header-component.vue'),
    MainFooter: () => import('@/components/home/main-footer-component.vue')
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      console.log('获取store', JSON.parse(sessionStorage.getItem('store')))
      // sessionStorage.removeItem('auth')
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      console.log('缓存store', this.$store.state)
      // if (!this.auth) return
      // sessionStorage.setItem('auth', this.auth)
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="scss">
* {
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
}
body, html {
  background: #f7f7f7;
}
#app {
  .main-container {
    min-height: calc(100vh - 149px);
  }
}
</style>
