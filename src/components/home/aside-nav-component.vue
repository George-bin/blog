<template>
  <div
    :class="{
      'show-mobile-aside-nav': mobileAsideNav
    }"
    class="aside-nav-component"
    @click="handleClickCloseMobileAsideNav">
    <!-- 文章分类 -->
    <div
      class="article-classify">
      <h3 class="article-classify__title">文章分类</h3>
      <ul class="article-classify-list">
        <li
          v-for="(item, index) in articleClassify"
          :key="index"
          class="article-classify-list__item">
          <span class="article-classify-list__item-name" @click="handleClickGetArticleByNotebookId(item)">{{item.name}}</span>
          <span class="article-classify-list__item-count">({{item.count}})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      articleClassify: [],
      activeDate: new Date()
    }
  },
  computed: {
    ...mapState({
      mobileAsideNav: state => state.home.mobileAsideNav
    })
  },
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY',
      'SET_MOBILE_ASIDE_NAV'
    ]),
    ...mapActions([
      'GetClassifyList',
      'GetArticleByNotebookId'
    ]),
    init () {
      this.GetClassifyList()
        .then(data => {
          let { errcode, message, list } = data
          if (errcode === 0) {
            this.articleClassify = JSON.parse(JSON.stringify(list))
            return
          }
          this.$message({
            type: 'warning',
            message
          })
        })
        .catch(err => {
          console.error('获取文章分类列表失败!', err)
          this.$message({
            type: 'error',
            message: '获取文章分类列表失败!'
          })
        })
    },
    // 获取分类文章
    handleClickGetArticleByNotebookId (item) {
      this.SET_ACTIVE_CLASSIFY(item)
      this.GetArticleByNotebookId({
        id: item._id,
        params: {
          page: 1,
          count: 10
        }
      })
        .then(res => {
          let { errcode, message } = res
          if (errcode === 0) {
            this.$backtopAni()
            this.$router.push('/')
            return
          }
          this.$message({
            type: 'warning',
            message
          })
        })
        .catch(err => {
          console.error('获取指定分类的文章失败!', err)
          this.$message({
            type: 'error',
            message: '获取指定分类的文章失败!'
          })
        })
    },
    // mobile => 关闭侧边栏
    handleClickCloseMobileAsideNav () {
      if (this.mobileAsideNav) {
        this.SET_MOBILE_ASIDE_NAV(false)
      }
    }
  }
}
</script>

<style lang="scss">
.aside-nav-component {
  margin-left: 10px;
  .article-classify {
    width: 220px;
    padding: 20px;
    border: 1px solid #eee;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;
    .article-classify__title {
      font-size: 14px;
    }
    .article-classify-list {
      margin-top: 10px;
      .article-classify-list__item {
        color: #0a419b;
        .article-classify-list__item-name {
          &:hover {
            border-bottom: 1px solid #0a419b;
            cursor: pointer;
          }
        }
        .article-classify-list__item-count {
          font-size: 12px;
          color: gray;
        }
      }
      .article-classify-list__item + .article-classify-list__item {
        margin-top: 5px;
      }
    }
  }
}
@media screen and (max-width: 650px) {
  .aside-nav-component {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    margin-left: 0;
    transform: translateX(-100%);
    transition: all 0.5s;
    z-index: 9998;
    .article-classify  {
      height: 100vh;
      padding-top: 70px;
      border: none;
      border-radius: 0;
      background: #f9f9f9;
      box-shadow: 0 5px 10px #dfdfdf;
    }
  }
  .show-mobile-aside-nav {
    transform: translateX(0);
  }
}
</style>
