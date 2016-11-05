const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        loader: 'babel',
        include: [path.join(__dirname, 'client')],
        exclude: /node_modules/
      }
    ]
  },
};