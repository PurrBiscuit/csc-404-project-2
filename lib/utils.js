const { map, path } = require('ramda')

const formatErrors = errors =>
  map(path(['properties', 'message']))(errors)

module.exports = {
  formatErrors
}
