<template>
  <div id="app">
    <!-- 返回顶部 -->
    <back-top ref="hi"></back-top>
    <main-header></main-header>
    <div class="main-container">
      <router-view/>
    </div>
    <main-footer></main-footer>
    <m-bg ref="mBg" @hook:mounted="$_handleMBgMounted"></m-bg>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
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
  mounted () {
    this.handleIsPC()
  },
  methods: {
    ...mapMutations([
      'SET_IS_PC'
    ]),
    /**
     * MBg组件加载完成
     */
    $_handleMBgMounted () {
    },
    /**
     * 判断PC和移动端环境
     */
    handleIsPC () {
      let userAgentInfo = navigator.userAgent
      let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      this.SET_IS_PC(flag)
    }
  }
}
</script>

<style lang="scss">
@import "assets/css/initElement";
* {
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
}
body, html {
  background: #f7f7f7;
}
#app {
  .main-container {
    min-height: calc(100vh - 74px - 10px - 120px);
    margin-top: 10px;
  }
}
@media screen and (max-width: 650px) {
  #app {
    background: #fff;
    .main-container {
      min-height: calc(100vh - 54px - 10px - 120px);
    }
  }
}
</style>
