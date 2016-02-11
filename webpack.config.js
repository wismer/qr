module.exports = {
    entry: "./src/pre-compiled/main.js",
    output: {
        path: __dirname,
        filename: "./public/js/compiled/main.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /\.\.\/node_modules/, loader: "babel-loader"}
      ]
    }
};