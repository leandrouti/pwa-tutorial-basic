const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);

module.exports = env => {
  return webpackMerge(
    {
      mode: env.mode,
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new CopyWebpackPlugin(
          [{ from: 'src/img', to: 'img/' }, 'src/manifest.webmanifest'],
          { ignore: ['.DS_Store'] }
        )
      ]
    },
    modeConfig(env)
  );
};
