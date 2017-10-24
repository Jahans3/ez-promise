const path = require('path')

const library = 'ez-promise'

module.exports = {
  entry: './src/index.js',
  output: {
    library,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: `${library}.js`
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
