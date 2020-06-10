<template>
  <div class="article-content-component">
    <!-- 面包屑导航 -->
    <div class="path-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <span @click="handleClickGoIndex">首页</span>
        </el-breadcrumb-item>
        <!-- 目录 -->
        <el-breadcrumb-item v-if="activeClassify" :to="{ path: '/' }">{{activeClassify.name}}</el-breadcrumb-item>
        <!-- 查询 -->
        <el-breadcrumb-item v-else-if="keyword" :to="{ path: '/' }">搜索:{{keyword}}</el-breadcrumb-item>
        <el-breadcrumb-item>当前文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章内容 -->
    <h2 class="article-title">{{article.title}}</h2>
    <p class="article-des">
      <span class="time">这篇文章发布于 {{$moment(article.createTime).format('YYYY年MM月DD日 HH:mm')}}，</span>
      归类于<span class="classify" @click="handleClickGoClassify">{{article.notebook ? article.notebook.name : ''}}</span>。
      <span class="time">最后更新时间 {{$moment(article.updateTime).format('YYYY年MM月DD日 HH:mm')}} </span>
      <span class="traffic">阅读0次，今日0次</span>
    </p>
    <div class="article-cover">
      <img v-if="article.img" :src="article.img" alt="cover" />
      <img v-else src="../../assets/img/normal-cover.jpeg" alt="normal-cover">
    </div>
    <!-- v-highlight -->
    <div class="article-content" v-html="article.content"></div>
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
      article: {}
    }
  },
  computed: {
    ...mapState({
      activeClassify: state => state.article.activeClassify,
      keyword: state => state.article.keyword
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
      'SET_KEYWORD'
    ]),
    ...mapActions([
      'GetArticleById',
      'GetArticleByNotebookId'
    ]),
    init () {
      // console.log('this.params', this.$route.params)
      let { id } = this.$route.params
      this.GetArticleById(id)
        .then(res => {
          let { errcode, message, article } = res
          if (errcode === 0) {
            let host = ''
            if (process.env.NODE_ENV === 'development') {
              let lastIndex = process.env.BASE_API.lastIndexOf(':')
              host = process.env.BASE_API.substring(0, lastIndex)
            }
            this.article = JSON.parse(JSON.stringify(article))
            this.article.content = article.content.replace(/src="\/file\/uploads\/images\/blog/g, `src="${host}/file/uploads/images/blog`)
            return
          }
          this.$message({
            type: 'warning',
            message
          })
        })
        .catch(err => {
          console.error('获取文章内容失败!', err)
          this.$message({
            type: 'error',
            message: '获取文章内容失败!'
          })
        })
    },
    handleClickGoIndex () {
      this.SET_ACTIVE_CLASSIFY(null)
      this.SET_KEYWORD('')
    },
    handleClickGoClassify () {
      if (!this.article.notebook) return
      this.GetArticleByNotebookId({
        id: this.article.notebook._id,
        params: {
          page: 1,
          count: 10
        }
      })
        .then(res => {
          let { errcode, message } = res
          if (errcode === 0) {
            this.SET_ACTIVE_CLASSIFY(this.article.notebook)
            this.$backtopAni()
            this.$router.push('/article')
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
.article-content-component {
  padding: 20px 30px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 4px;
  .path-nav {
    padding: 10px;
    background: rgba(10, 65, 155, 0.1);
    // border-radius: 4px;
  }
  .article-title {
    margin-top: 10px;
    font-size: 28px;
    font-weight: bold;
  }
  .article-cover {
    img {
      display: block;
      width: 100%;
    }
  }
  .article-des {
    margin-top: 22px;
    font-size: 12px;
    color: gray;
    .classify {
      color: #0a419b;
      &:hover {
        border-bottom: 1px solid #0a419b;
        cursor: pointer;
      }
    }
  }
  .article-content {
    margin-top: 18px;
    // code {
    //   width: 400px;
    // }
    ol {
      margin-left: 40px;
      li {
        list-style-type: decimal;
      }
      li + li {
        margin-top: 6px;
      }
    }
    ul {
      margin-left: 20px;
      li::before {
        display: inline-block;
        content: '';
        width: 8px;
        height: 8px;
        margin-left: 0;
        margin-right: 5px;
        background: gray;
        border-radius: 50%;
      }
      li + li {
        margin-top: 6px;
      }
    }
  }
  img {
    display: block;
    width: 400px;
    margin-top: 5px;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 22px;
  }
  h3 {
    font-size: 20px;
  }
}
@media screen and (min-width: 1200px) {
  code {
    width: calc(1180px - 270px - 60px - 22px);
  }
}
@media screen and (max-width: 1200px) {
  code {
    width: calc(100vw - 270px - 60px - 22px - 40px);
  }
}
@media screen and (max-width: 650px) {
  code {
    width: calc(100vw - 64px);
  }
  .article-content-component {
    padding: 20px 10px;
    font-size: 14px;
    .article-title {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
    }
    img {
      width: 100%;
    }
  }
}
</style>
