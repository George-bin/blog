<template>
  <div class="main-nav-component">
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
    <!-- <span class="mobile-nav"></span> -->
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
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
    handleClickSwitchRouter (item) {
      // this.activeRoute = item.path
      // this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss">
.main-nav-component {
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
@media screen and (max-width: 650px) {
  .main-nav-component {
    .main-nav {
      display: none;
    }
  }
}
</style>
