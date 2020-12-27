const path = require("path");

module.exports = {
  entry: [
    "./js/main.js",
    "./js/utils.js",
    "./js/download.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/page-activation.js",
    "./js/foto.js",
    "./js/form-validation.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
