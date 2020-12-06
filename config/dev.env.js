'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost"',
  BASE_API: '"http://www.gengsb.top"',
  BASE_PORT: 13001
})
