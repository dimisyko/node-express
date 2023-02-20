const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    devMiddleware: {
      writeToDisk: (filePath) => {
        return /^(?!.*(hot)).*/.test(filePath);
      },
    },
  },
});