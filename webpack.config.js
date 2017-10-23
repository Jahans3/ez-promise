const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'ezpromise',
    libraryTarget: 'umd',
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
            presets: ['env'],
            plugins: ['transform-es2015-parameters']
          }
        }
      }
    ]
  }
}
