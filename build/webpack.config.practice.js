// 通过webpack-merge来扩展我们的配置文件
const path = require('path') // path是Nodejs中的基本包,用来处理路径
const HTMLPlugin = require('html-webpack-plugin') // 引入html-webpack-plugin
const webpack = require('webpack') // 引入webpack
const merge = require('webpack-merge') // 这个工具可以帮我们合并不同文件的webpack配置
const baseConfig = require('./webpack.config.base')

const devServer = {
  // 这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
  port: 8080, // 访问的端口号
  host: '127.0.0.1', // 可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
  overlay: {
    errors: true // 编译中遇到的错误都会显示到网页中去
  },
  // open: true ,                                 //项目启动时,会默认帮你打开浏览器
  hot: true // 在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'style-loader', // 将css写入到html中去
          'css-loader', // css-loader处理css
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true // stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
            } // 那么postcss-loader可以直接引用前面的sourceMap
          },
          'stylus-loader' // 处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
        ]
      }
    ]
  },
  devServer,
  resolve: {
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    // 添加两个插件用于hot:true的配置
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config // 声明一个config的配置,用于对外暴露
