// 通过webpack-merge来扩展我们的配置文件
const path = require('path') // path是Nodejs中的基本包,用来处理路径
const HTMLPlugin = require('html-webpack-plugin') // 引入html-webpack-plugin
const webpack = require('webpack') // 引入webpack
const merge = require('webpack-merge') // 这个工具可以帮我们合并不同文件的webpack配置
const ExtractPlugin = require('extract-text-webpack-plugin') // 使用 extract-text-webpack-plugin 自动提取 CSS。适用于大多数预处理器，且也可在生产环境进行压缩。
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development' // 判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的
const devServer = {
  // 这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
  port: 8000, // 访问的端口号
  host: '127.0.0.1', // 可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
  overlay: {
    errors: true // 编译中遇到的错误都会显示到网页中去
  },
  historyApiFallback: {
    index: '/index.html'
  },
  // open: true ,                                 //项目启动时,会默认帮你打开浏览器
  hot: true // 在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      // 添加两个插件用于hot:true的配置
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: { filename: '[name].[chunkhash:8].js' }, // 此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader', // css-loader处理css
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true // stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                } // 那么postcss-loader可以直接引用前面的sourceMap
              },
              'stylus-loader' // 处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'), // 定义打包分离出的css文件名
      new webpack.optimize.CommonsChunkPlugin({
        // 定义静态文件打包
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        // 将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题
        name: 'runtime'
      })
    ])
  })
}

module.exports = config // 声明一个config的配置,用于对外暴露
