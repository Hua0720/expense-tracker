const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const categoryList = require('../seeds/category.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categoryList)
    .then(() => {
      console.log('Categories are created.')
      return process.exit()
    })
    .catch(err => console.log(err))
})