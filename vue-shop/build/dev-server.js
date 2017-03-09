/**
 * Created by lucky on 17-3-9.
 *
 * 开发环境服务端配置
 */
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// 开发环境默认端口
var port = process.env.PORT || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 当html-webpack-plugin模板变化时强制页面重载
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})


var context = config.dev.context
var proxyPath = config.dev.proxyPath

var options = {
  target: proxyPath,
  changeOrigin: true,
}

if (context.length) {
  app.use(proxyMiddleware(context, options))
}

/**
app.use(proxyMiddleware('/paypal', {
  target: 'https://pay.ele.me',
  changeOrigin: true,
}))
app.use(proxyMiddleware('/m.ele.me@json', {
  target: 'https://crayfish.elemecdn.com',
  changeOrigin: true,
}))
*/
// 为HTML5 history API处理fallback
app.use(require('connect-history-api-fallback'))

// 提供webpack打包输出
app.use(devMiddleware)

// 启用热加载和状态维持
app.use(hotMiddleware)

// 提供纯静态资源
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // 当运行环境为测试时，不需要打开浏览器
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
