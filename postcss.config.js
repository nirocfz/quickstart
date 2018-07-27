/* eslint-disable */

module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')({browsers: '> 5%, last 4 versions'})
  ]
}