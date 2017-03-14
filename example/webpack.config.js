module.exports = {
  entry: './src/hello_world.go',
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      { test: /\.go$/, loader: 'gopherjs-loader' }
    ]
  }
}
