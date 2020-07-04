'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:10023"'
  BASE_API: '"http://www.gengsb.top"',
  BASE_POINT: 10023
})
