const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
entry: [
  "./src/assets/js/script.js",
  "./src/assets/style/style.scss"
],

output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'js/script.js',
},
  module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
          {
            test: /\.(ttf|eot|otf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name][ext]'
            }
          },
          {
            test: /\.(jpg|png|gif|webp|svg|ico|mp4)$/,
            type: 'asset/resource',
            generator: {
              filename: 'img/[name][ext]'
            }
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      'autoprefixer',
                    ]
                  ]
                }
              }
            }, 'sass-loader']
          }

        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'style/style.css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: "src/assets/img", to: "img"}
        ],
      }),
      ]
};