import Vue from 'vue'
import moment from 'moment'

/**
 * 根据指定规则拼接图片远程地址（nginx）
 */
Vue.filter('imgPath', function (value) {
  value = value.trim()
  if (!value) return
  let result = `${process.env.BASE_API}${value}`
  return result
})

/**
 * 时间序列化
 */
Vue.filter('dateFormat', function (value) {
  return moment(value).format('YYYY年MM月DD日 HH:mm')
})
