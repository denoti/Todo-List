const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index2.js',

  devServer: {
    static: './dist',
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
