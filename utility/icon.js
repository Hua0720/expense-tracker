const handlebars = require('handlebars')
const Category = require('../models/category')
const categoryFind = []

Category.find()
  .lean()
  .then(category => {
    categoryFind.push(...category)
  })
  .catch(err => console.log(err))

const Icon = handlebars.registerHelper('Icon', (number) => {
  const iconList = categoryFind.find(data => data.id === number)
  return iconList.icon
})

module.exports = Icon