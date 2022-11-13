const express = require('express')
const router = express.Router()

// 引用model
const Record = require('../../models/record')
const Category = require('../../models/category')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryId = Number(req.query.sort)
  const categoryList = []

  Category.find()
    .lean()
    .then(category => categoryList.push(...category))
    .then(() => {
      // 該使用者所有類別的支出
      if (!categoryId) {
        console.log(categoryId)
        Record.find({ userId })
          .lean()
          .sort({ date: 'asc' })
          .then(records => {
            let totalAmount = 0
            categoryList.forEach(category => {
              if (categoryId === category.id) {
                category.selected = true
              }
            })
            records.forEach(record => {
              totalAmount += record.amount
            })
            return res.render('index', { records, categoryList, totalAmount })
          })
      } else {
        // 類別支出
        console.log(categoryId)
        Record.find({ userId, category: categoryId })
          .lean()
          .sort({ date: 'asc' })
          .then(records => {
            let totalAmount = 0
            categoryList.forEach(category => {
              if (categoryId === category.id) {
                category.selected = true
              }
            })
            records.forEach(record => {
              totalAmount += record.amount
            })
            return res.render('index', { records, categoryList, totalAmount, categoryId })
          })
      }
    })
    .catch(err => console.log(err))
})

module.exports = router