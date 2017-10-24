const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'ez-promise',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'ezpromise.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-es2015-parameters']
          }
        }
      }
    ]
  }
}
