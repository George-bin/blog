<template>
  <div class="aside-nav-component">
    <!-- 文章分类 -->
    <div class="article-classify">
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
import { mapMutations, mapActions } from 'vuex'
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
  },
  watch: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_CLASSIFY'
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
      this.$router.push('/')
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
    }
  }
}
</script>

<style lang="scss">
.aside-nav-component {
  width: 220px;
  margin-left: 10px;
  .article-classify {
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
</style>
