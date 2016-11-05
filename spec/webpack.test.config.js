module.exports = {
  devtool: 'cheap-module-source-map',
  output: {filename: 'spec.js'},
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};