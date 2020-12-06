<template>
  <div class="article-list-component">
    <header v-if="activeClassify || keyword" class="article-list__header">
      <h2 v-if="activeClassify">”{{activeClassify.name}}”目录存档</h2>
      <h2 v-else>
        <span style="color: #ed1925">#</span>
        搜索：{{keyword}}
      </h2>
    </header>
    <!-- 分页组件 -->
    <el-pagination
      :small="!isPC"
      background
      layout="total, prev, pager, next"
      :current-page="paging.pageNum"
      :total="paging.total"
      :page-size="paging.pageSize"
      @current-change="onCurrentChange"></el-pagination>
    <!-- 文章列表 -->
    <div class="article-list">
      <div
        v-for="(item, index) in articleList"
        :key="index"
        class="article-list__item">
        <h4 class="article-list__item-title" @click="handleClickReadMore(item)">{{item.title}}</h4>
        <p class="article-list__item-des">
          <span class="time">{{item.updateTime | dateFormat}}</span>
          <span class="traffic">阅读0次,今日0次</span>
        </p>
        <div class="article-list__item-intro">
          <div class="content">
            <p v-if="item.introduction" v-html="item.introduction" style="white-space: pre-wrap;"></p>
            <p v-else>暂无简介信息!</p>
            <button class="read-more-btn" @click="handleClickReadMore(item)">阅读全文...</button>
          </div>
          <img v-if="item.cover" class="cover" :src="item.cover | imgPath" alt="cover" />
          <img v-else class="cover" src="../../assets/img/normal-cover.jpeg" />
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      class="footer-pagination"
      :small="!isPC"
      background
      layout="total, prev, pager, next"
      :current-page="paging.pageNum"
      :total="paging.total"
      :page-size="paging.pageSize"
      @current-change="onCurrentChange">
    </el-pagination>
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
    }
  },
  computed: {
    ...mapState({
      paging: state => state.article.paging,
      activeClassify: state => state.article.activeClassify,
      articleList: state => state.article.articleList,
      keyword: state => state.article.keyword,
      isPC: state => state.home.isPC
    })
  },
  watch: {
    isPC: function (val, oldval) {
      console.log(val)
    }
  },
  created () {},
  mounted () {
    this.init()
    console.log(this.isPC)
  },
  methods: {
    ...mapMutations([
      'SET_PAGING'
    ]),
    ...mapActions([
      'GetArticleList',
      'GetArticleByNotebookId'
    ]),
    init () {
      if (!this.activeClassify && !this.keyword) {
        this.handleGetArticleList()
      }
    },
    handleGetArticleList () {
      this.GetArticleList({
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize
      })
        .then(res => {
          let { code, msg } = res
          if (code === null) {
            this.$backtopAni()
            return
          }
          this.$message({
            type: 'error',
            message: msg
          })
        })
        .catch(err => {
          console.log('获取文章列表失败!', err)
          this.$message({
            type: 'error',
            message: '获取文章列表失败!'
          })
        })
    },
    handleGetArticleByNotebookId () {
      this.GetArticleByNotebookId({
        id: this.activeClassify.id,
        params: {
          pageNum: this.paging.pageNum,
          pageSize: this.paging.pageSize
        }
      })
        .then(res => {
          let {code, msg} = res
          if (code === null) {
            this.$backtopAni()
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
        .catch(err => {
          console.error('获取指定分类的文章失败：', err)
        })
    },
    // 改变页数
    onCurrentChange (pageNum) {
      this.SET_PAGING({
        pageNum,
        pageSize: this.paging.pageSize,
        total: this.paging.total
      })
      if (this.activeClassify) {
        this.handleGetArticleByNotebookId()
      } else {
        this.handleGetArticleList()
      }
    },
    // 阅读全文
    handleClickReadMore (item) {
      this.$backtop()
      this.$router.push(`/article/${item.id}`)
    }
  }
}
</script>

<style lang="scss">
.article-list-component {
  .article-list__header {
    h2 {
      padding-bottom: 20px;
      font-size: 30px;
      color: #333;
      border-radius: 4px;
    }
  }
  .el-pagination {
    padding: 0;
    margin-left: -5px;
  }
  .article-list {
    .article-list__item {
      margin-top: 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      .article-list__item-title {
        font-size: 21px;
        font-weight: bold;
        color: #0a419b;
        &:hover {
          color: #1255c1;
          cursor: pointer;
        }
      }
      .article-list__item-des {
        margin-top: 6px;
        font-size: 12px;
        color: gray;
        .traffic {
          margin-left: 10px;
        }
      }
      .article-list__item-intro {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 20px;
        .content {
          .read-more-btn {
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            color: #0a419b;
            background: none;
            outline: none;
            cursor: pointer;
            &:hover {
              border-bottom: 1px solid #0a419b;
            }
          }
        }
        .cover {
          width: 200px;
          margin-left: 14px;
        }
      }
    }
  }
  .footer-pagination {
    margin-top: 20px;
  }
  .el-pagination {
    padding-left: 6px;
  }
}
@media screen and (max-width: 650px) {
  .article-list-component {
    padding: 10px;
    .article-list__header {
      h2 {
        padding-bottom: 10px;
        font-size: 20px;
      }
    }
    .article-list {
      .article-list__item {
        margin-top: 20px;
        .article-list__item-title {
          font-size: 16px;
        }
        .article-list__item-des {
          font-size: 10px;
        }
        .article-list__item-intro {
          .content {
            font-size: 13px;
            .read-more-btn {
              font-size: 13px;
            }
          }
          .cover {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
