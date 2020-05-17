<template>
  <div class="main-search-component">
    <el-input
      v-model.trim="keyword"
      clearable
      prefix-icon="el-icon-search"
      placeholder="请输入文章关键字!"
      @keyup.enter.native="handleSearchArticle">
    </el-input>
    <!-- <span class="mobile-search-icon"><i class="el-icon-search"></i></span> -->
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
      keyword: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations([
      'SET_KEYWORD',
      'SET_ACTIVE_CLASSIFY'
    ]),
    ...mapActions([
      'GetArticleByKeyword'
    ]),
    handleSearchArticle () {
      if (!this.keyword) return
      this.$router.push('/')
      this.SET_ACTIVE_CLASSIFY(null)
      this.SET_KEYWORD(this.keyword)
      this.GetArticleByKeyword({
        keyword: this.keyword,
        page: 1,
        count: 10
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
          console.error('查询文章失败!', err)
          this.$message({
            type: 'error',
            message: '查询文章失败!'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.main-search-component {
  .el-input__inner {
    border-radius: 30px;
  }
  .mobile-search-icon {
    display: none;
    i {
      font-size: 22px;
    }
  }
}
@media screen and (max-width: 650px) {
  .main-search-component {
    .el-input {
      display: none;
    }
    .mobile-search-icon {
      display: inline-block;
    }
  }
}
</style>
