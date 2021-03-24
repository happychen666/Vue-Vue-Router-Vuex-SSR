module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //去掉标签中多余的空格，避免页面渲染出空格
    extractCss: !isDev, // extract-text-webpack-plugin插件可以将css单独打包到一个文件中
    cssModules: {
      localIdentName: isDev
        ? '[path]-[name]-[hash:base64:5]'
        : '[hash:base64:5]',
      camelCase: true,
    },
    // hotReload: false, //根据环境变量自动生产
  }
}
