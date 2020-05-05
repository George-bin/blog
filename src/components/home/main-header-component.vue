<template>
  <header class="main-header-component">
    <div class="main-header-box min-width">
      <div class="logo" @click="handleGoIndex">
        <img src="../../../static/img/logo.png" alt="logo" />
        <h1>George<span>专注前端开发</span></h1>
      </div>
      <!-- 搜索区域 -->
      <main-search></main-search>
      <!-- 主导航 -->
      <nav class="main-nav">
        <ul class="main-nav-list">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{
              'active-route': item.path === activeRoute
            }"
            class="main-nav-list__item"
            @click="handleClickSwitchRouter(item)">
            {{item.title}}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {
    MainSearch: () => import('@/components/home/main-search-component.vue')
  },
  data () {
    return {
      activeRoute: '',
      navList: [
        {
          title: '归档',
          path: '/'
        },
        {
          title: '生活',
          path: '/life'
        },
        {
          title: '关于',
          path: '/about'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY',
      'SET_KEYWORD'
    ]),
    ...mapActions([
      'GetArticleList'
    ]),
    handleClickSwitchRouter (item) {
      // this.activeRoute = item.path
      // this.$router.push(item.path)
    },
    handleGoIndex () {
      this.SET_ACTIVE_CLASSIFY(null)
      this.SET_KEYWORD('')
      this.GetArticleList({
        page: 1,
        count: 10
      })
      this.$router.push('/')
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
  border-bottom: 1px solid #eee;
  background: #fff;
  .main-header-box {
    height: 59px;
    display: flex;
    align-items: center;
    .logo {
      flex: 1;
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
        font-size: 24px;
        font-weight: normal;
        color: #ed1925;
        span {
          margin-left: 2px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .main-nav {
    .main-nav-list {
      display: flex;
      .main-nav-list__item {
        height: 58px;
        line-height: 58px;
        margin-left: 20px;
        font-size: 14px;
        // font-weight: bold;
        cursor: pointer;
      }
      .active-route {
        border-bottom: 2px solid #0a419b;
        color: #0a419b;
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
</style>
