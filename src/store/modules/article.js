import {
  getClassifyListRequest,
  getArticleListRequest,
  getArticleByIdRequest,
  getArticleByNotebookIdReuqest,
  getArticleByKeywordRequest
} from '@/api/article.js'

const article = {
  state: {
    paging: {
      page: 1,
      count: 10,
      totals: 0
    },
    articleList: [],
    activeClassify: null,
    keyword: ''
  },
  mutations: {
    SET_PAGING (state, data) {
      state.paging = { ...data }
    },
    SET_ARTICLE_LIST (state, data) {
      state.articleList = JSON.parse(JSON.stringify(data))
    },
    SET_ACTIVE_CLASSIFY (state, data) {
      state.activeClassify = JSON.parse(JSON.stringify(data))
    },
    SET_KEYWORD (state, data) {
      state.keyword = data
    }
  },
  actions: {
    // 获取分类列表
    GetClassifyList ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        getClassifyListRequest()
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取指定分类的文章
    GetArticleByNotebookId ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getArticleByNotebookIdReuqest(data)
          .then(res => {
            let { errcode, data } = res.data
            if (errcode === 0) {
              let { page, count, totals, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                page,
                count,
                totals
              })
            }
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取所有文章列表
    GetArticleList ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getArticleListRequest(data)
          .then(res => {
            let { errcode, data } = res.data
            if (errcode === 0) {
              let { page, count, totals, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                page,
                count,
                totals
              })
            }
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取文章内容 by id
    GetArticleById ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getArticleByIdRequest(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取文章内容 by id
    GetArticleByKeyword ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getArticleByKeywordRequest(data)
          .then(res => {
            let { errcode, data } = res.data
            if (errcode === 0) {
              let { page, count, totals, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                page,
                count,
                totals
              })
            }
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default article
