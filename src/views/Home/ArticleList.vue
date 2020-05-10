<template>
  <div class="article-list-component">
    <header v-if="activeClassify || keyword" class="article-list__header">
      <h2 v-if="activeClassify">"{{activeClassify.name}}"目录存档</h2>
      <h2 v-else>
        <span style="color: #ed1925">#</span>
        搜索：{{keyword}}
      </h2>
    </header>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :current-page="paging.page"
      :total="paging.totals"
      :page-size="paging.size"
      @current-change="onCurrentChange">
    </el-pagination>
    <!-- 文章列表 -->
    <div class="article-list">
      <div
        v-for="(item, index) in articleList"
        :key="index"
        class="article-list__item">
        <h4 class="article-list__item-title" @click="handleClickReadMore(item)">{{item.title}}</h4>
        <p class="article-list__item-des">
          <span class="time">{{$moment(item.createTime).format('YYYY年MM月DD日 HH:mm')}}</span>
          <span class="traffic">阅读0次,今日0次</span>
        </p>
        <div class="article-list__item-intro">
          <div class="content">
            <p>{{item.introduction ? item.introduction : '暂无简介信息!'}}</p>
            <button class="read-more-btn" @click="handleClickReadMore(item)">阅读全文...</button>
          </div>
          <img class="cover" :src="item.img ? item.img : require('../../assets/img/normal-cover.jpeg')" alt="cover" />
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      v-if="articleList.length > 5"
      class="footer-pagination"
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :current-page="paging.page"
      :total="paging.totals"
      :page-size="paging.size"
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
        page: this.paging.page,
        count: this.paging.count
      })
        .then(res => {
          let { errcode, message } = res
          if (errcode === 0) {
            return
          }
          this.$message({
            type: 'error',
            message
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
    // 改变页数
    onCurrentChange (page) {
      this.SET_PAGING({
        page,
        count: this.paging.count,
        totals: this.paging.totals
      })
      this.handleGetArticleList()
    },
    // 阅读全文
    handleClickReadMore (item) {
      this.$router.push(`/article/${item._id}`)
    }
  }
}
</script>

<style lang="scss">
.article-list-component {
  padding: 20px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 4px;
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
    margin-top: 26px;
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
}
</style>
