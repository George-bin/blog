import request from '../utils/request'

// 获取所有分类
export function getClassifyListRequest () {
  return request({
    url: '/api/blog/classify'
  })
}

// 获取指定分类文章
export function getArticleByNotebookIdReuqest (data) {
  return request({
    url: `/api/blog/classify/${data.id}`,
    params: data.params
  })
}

// 获取文章列表
export function getArticleListRequest (data) {
  return request({
    url: `/api/blog/article`,
    method: 'get',
    params: data
  })
}

// 获取文章内容 by id
export function getArticleByIdRequest (id) {
  return request({
    url: `/api/blog/article/${id}`
  })
}

// 获取文章 by keyword
export function getArticleByKeywordRequest (params) {
  return request({
    url: '/api/blog/article/search',
    method: 'get',
    params
  })
}
