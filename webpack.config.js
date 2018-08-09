module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/docs',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/docs',
    compress: true,
    port: 8080
  }
};
