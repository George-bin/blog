<template>
  <div class="home-component">
    <div class="home-box min-width">
      <div class="home-container">
        <router-view></router-view>
      </div>
      <!-- 分类列表 -->
      <aside-nav></aside-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {
    AsideNav: () => import('@/components/home/aside-nav-component')
  },
  data () {
    return {}
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.home-component {
  .home-box {
    display: flex;
    .home-container {
      flex: 1;
      padding: 20px 30px;
      background: #fff;
    }
  }
}
@media screen and (max-width: 650px) {
  .home-component {
    .home-box {
      display: block;
      margin: 0;
      .home-container {
        padding: 0;
        background: none;
      }
    }
  }
}
</style>
