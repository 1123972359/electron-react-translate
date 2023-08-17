const path = require('path');
const fs = require('fs');
const { whenProd } = require('@craco/craco');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// help doc: https://github.com/gsoft-inc/craco
module.exports = {
  webpack: {
    plugins: {
      add: [
        // 另一个html入口
        [
          new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                filename: 'result.html',
                template: resolveApp('public/result.html') // 需要在 public 文件夹中添加一个 another-index.html 文件作为模版
              },
              whenProd(() => ({
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }))
            )
          ),
          'prepend' // html-webpack-plugin 需要在plugins列表中前置，需要 @craco/craco > v6.3.0
        ]
      ] /* An array of plugins */
    },
    configure: (webpackConfig, { env, paths }) => {
      // 修改输出资源路径
      if (process.env.E_ENV === 'prod') {
        webpackConfig.output.publicPath = './'; // 你的资源路径
      }

      return webpackConfig;
    }
  },
  devServer: {
    // 访问 /one/xxx 和 /another/xxx 会使用不同的入口html
    historyApiFallback: {
      disableDotRule: true,
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /^\/one/, to: '/index.html' },
          { from: /^\/result/, to: '/result.html' }
        ]
      }
    }
  }
};
