<template>
  <header
    class="main-header-component"
    @click="handleClickCloseMobileAsideNav">
    <div class="main-header-box min-width">
      <div class="logo" @click="handleGoIndex">
        <img src="../../../static/img/logo.png" alt="logo" />
        <h1><span class="name">George</span><span class="label">专注前端开发</span></h1>
      </div>
      <!-- 移动端菜单icon -->
      <span @click.stop="handleClickOpenMobileAsideNav" class="mobile-aside-nav-icon">
        <i class="iconfont icon-caidan"></i>
      </span>
      <div class="right-box">
        <!-- 主导航 -->
        <!-- <main-nav></main-nav> -->
        <!-- 搜索区域 -->
        <main-search></main-search>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    MainSearch: () => import('@/components/home/main-search-component.vue'),
    MainNav: () => import('@/components/home/main-nav-component.vue')
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      mobileAsideNav: state => state.home.mobileAsideNav
    })
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY',
      'SET_KEYWORD',
      'SET_MOBILE_ASIDE_NAV'
    ]),
    ...mapActions([
      'GetArticleList'
    ]),
    handleGoIndex () {
      this.SET_ACTIVE_CLASSIFY(null)
      this.SET_KEYWORD('')
      this.GetArticleList({
        page: 1,
        count: 10
      })
      this.$backtopAni()
      this.$router.push('/')
    },
    handleClickOpenMobileAsideNav () {
      this.SET_MOBILE_ASIDE_NAV(!this.mobileAsideNav)
    },
    handleClickCloseMobileAsideNav () {
      this.SET_MOBILE_ASIDE_NAV(false)
    }
  }
}
</script>

<style lang="scss">
.main-header-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  background: #fff;
  z-index: 9999;
  .main-header-box {
    height: 59px;
    display: flex;
    align-items: center;
    .logo {
      display: flex;
      align-items: flex-end;
      // align-items: center;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
      }
      h1 {
        margin-left: 5px;
        font-weight: normal;
        .name {
          font-size: 24px;
          color: #ed1925;
        }
        .label {
          margin-left: 2px;
          font-size: 14px;
          color: #333;
        }
      }
    }
    .right-box {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
    .mobile-aside-nav-icon {
      position: absolute;
      top: 8px;
      left: 10px;
      display: none;
      width: 40px;
      border: 1px solid #efefef;
      border-radius: 4px;
      i {
        display: block;
        font-size: 28px;
        color: gray;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .main-header-component {
    .main-header-box {
      margin: 0 10px;
    }
  }
}
@media screen and (max-width: 650px) {
  .main-header-component {
    .main-header-box {
      display: block;
      height: 49px;
      text-align: center;
      .logo {
        display: inline-block;
        margin-top: 6px;
        img {
          width: 35px;
          height: 35px;
        }
        h1 {
          display: none;
        }
      }
      .main-nav {
        display: none;
      }
      .mobile-aside-nav-icon {
        display: block;
      }
    }
  }
}
</style>
