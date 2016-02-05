module.exports = {
    entry: "./pre-compiled/*.js",
    output: {
        path: __dirname,
        filename: "../public/js/compiled/main.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /\.\.\/node_modules/, loader: "babel-loader"}
      ]
    }
};