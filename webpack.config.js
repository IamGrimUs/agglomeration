const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  entry: "./public/js/index.js",
  module: {
    rules: []
  },
  resolve: {
    extensions: [".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist")
  }
};
