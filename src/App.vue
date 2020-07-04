<template>
  <div id="app">
    <!-- 返回顶部 -->
    <back-top ref="hi"></back-top>
    <main-header></main-header>
    <div class="main-aphorism min-width">君子藏器于身，待时而动!</div>
    <div class="main-container">
      <router-view/>
    </div>
    <main-footer></main-footer>
    <m-bg ref="mBg" @hook:mounted="$_handleMBgMounted"></m-bg>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    BackTop: () => import('@/components/common/back-top-component.vue'),
    MainHeader: () => import('@/components/home/main-header-component.vue'),
    MainFooter: () => import('@/components/home/main-footer-component.vue'),
    MBg: () => import('@/components/common/m-bg-component')
  },
  created () {
    // console.log(process.env.BASE_API)
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
  },
  mounted () {},
  methods: {
    /**
     * MBg组件加载完成
     */
    $_handleMBgMounted () {
    }
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
  .main-aphorism {
    height: 36px;
    line-height: 36px;
    border: 1px solid rgba(10, 65, 155, 0.15);
    margin-top: 70px;
    text-align: center;
    color: rgba(10, 65, 155, 1);
    background: rgba(10, 65, 155, 0.1);
    border-radius: 4px;
  }
  .main-container {
    min-height: calc(100vh - 209px);
    margin-top: 10px;
  }
}
@media screen and (max-width: 650px) {
  #app {
    .main-aphorism {
      display: none;
    }
    .main-container {
      margin-top: 60px;
      min-height: calc(100vh - 151px);
    }
  }
}
</style>
