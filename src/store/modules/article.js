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
      pageNum: 1,
      pageSize: 10,
      total: 0
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
      data = JSON.parse(JSON.stringify(data))
      if (process.env.NODE_ENV === 'development') {
        data.forEach(item => {
          item.img = item.img ? `${process.env.BASE_API}${item.img}` : null
        })
      }
      state.articleList = data
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
          .then(response => {
            resolve(response.data)
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
          .then(response => {
            let { code, data } = response.data
            if (code === null) {
              let { pageNum, pageSize, total, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                pageNum,
                pageSize,
                total
              })
            }
            resolve(response.data)
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
          .then(response => {
            let { code, data } = response.data
            if (code === null) {
              let { pageNum, pageSize, total, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                pageNum,
                pageSize,
                total
              })
            }
            resolve(response.data)
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
          .then(response => {
            let { code, data } = response.data
            if (code === null) {
              let { pageNum, pageSize, total, list } = data
              commit('SET_ARTICLE_LIST', list)
              commit('SET_PAGING', {
                pageNum,
                pageSize,
                total
              })
            }
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default article
