const handlebars = require('handlebars')

const ifEven = handlebars.registerHelper('ifEven', function (index) {
  if (index % 2 === 0) {
    return true
  } else {
    return false
  }
})

module.exports = ifEven