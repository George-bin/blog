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
      <span class="time">这篇文章发布于 {{article.createTime | dateFormat}}，</span>
      归类于<span class="classify" @click="handleClickGoClassify">{{article.notebookName}}</span>。
      <span class="time">最后更新时间 {{article.updateTime | dateFormat}} </span>
      <span class="traffic">阅读0次，今日0次</span>
    </p>
    <!-- <div class="article-cover">
      <img v-if="article.img" :src="article.img" alt="cover" />
      <img v-else src="../../assets/img/normal-cover.jpeg" alt="normal-cover">
    </div> -->
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
      article: {},
      classify: {}
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
          let { code, msg, data } = res
          if (code === null) {
            data = JSON.parse(JSON.stringify(data))
            if (process.env.NODE_ENV === 'development') {
              let ip = process.env.BASE_API
              data.cover = data.cover ? `${process.env.BASE_API}${data.cover}` : null
              data.content = data.content.replace(/src="\/file\/blog/g, `src="${ip}/file/blog`)
            }
            this.article = data
            return
          }
          this.$message({
            type: 'warning',
            message: msg
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
      // if (!this.article.notebook) return
      this.GetArticleByNotebookId({
        id: this.article.notebookId,
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
        .then(res => {
          let { code, msg } = res
          if (code === null) {
            this.SET_ACTIVE_CLASSIFY({
              id: this.article.notebookId,
              name: this.article.notebookName
            })
            this.$backtopAni()
            this.$router.push('/article')
            return
          }
          this.$message({
            type: 'warning',
            message: msg
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
  .path-nav {
    padding: 10px;
    // background: rgba(0, 0, 0, 0.05);
    background: rgba(10, 65, 155, 0.1);
  }
  .article-title {
    margin-top: 20px;
    font-size: 36px;
    font-weight: bold;
    color: #555;
  }
  .article-cover {
    img {
      display: block;
      width: 100%;
    }
  }
  .article-des {
    margin-top: 10px;
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
    margin-top: 12px;
    line-height: 1.5;
    word-break: break-all; // 英语换行问题
    color: #555;
    * {
      line-height: 1.8;
    }
    p, h1, h2, h3, h4, h5, table, pre {
      margin: 10px 0;
    }
    ol {
      li {
        line-height: 1.5;
        list-style-type: decimal;
      }
    }
    ul {
      li {
        line-height: 1.5;
        list-style: disc;
      }
    }
    ul, ol {
      margin: 10px 0 10px 20px;
    }
    img {
      display: block;
      margin-top: 5px;
    }
    .eleImg {
      cursor: pointer;
      display: inline-block;
      padding: 0 3px;
    }
    h1 { font-size: 32px; }
    h2 { font-size: 24px }
    h3 { font-size: 18px }
    h4 { font-size: 16px }
    h5 { font-size: 14px }
    h6 { font-size: 12px }
    pre {
      display: block;
      width: 500px;
      // width: calc(100vw - 30px - 260px - 60px - 2px) !important;
      padding: 0;
      font-size: 13px;
      line-height: 1.5;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f7f7f7;
      // border: 1px solid #ccc;
      & > code {
        display: block;
        width: calc(100% - 20px);
        // max-height: 400px;
        padding: 10px;
        margin: 0;
        font-size: 14px;
        color: inherit;
        overflow: auto;
      }
    }
    code {
      padding: 3px 5px;
      margin: 0 3px;
      font-size: 80%;
      color: #c7254e;
      background: #f7f7f7;
      border-radius: 4px;
    }
    blockquote {
      display: block;
      border-left: 6px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }
  }
}
@media screen and (min-width: 1200px) {
  .article-content-component {
    pre {
      width: calc(1200px - 260px - 10px - 60px - 4px) !important;
    }
  }
}
@media screen and (max-width: 1200px) {
  .article-content-component {
    pre {
      width: calc(100vw - 20px - 60px) !important;
    }
  }
}
@media screen and (max-width: 650px) {
  .article-content-component {
    padding: 0 10px;
    font-size: 14px;
    .article-title {
      font-size: 20px;
    }
    .article-content {
      h1,h2,h3,h4,h5 { font-size: 16px !important; }
    }
    pre {
      width: calc(100vw - 20px) !important;
    }
    img {
      width: 100%;
    }
  }
}
</style>
