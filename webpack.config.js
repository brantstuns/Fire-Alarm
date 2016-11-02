const path = require('path');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [path.join(__dirname, 'client')],
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
}
