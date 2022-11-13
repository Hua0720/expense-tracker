const express = require('express')
const router = express.Router()

// 引用 model
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

// 新增頁面
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categoryList => {
      res.render('new', { categoryList })
    })
    .catch(err => console.log(err))
})

// 新增功能
router.post('/', (req, res) => {
  const userId = req.user._id
  req.body.userId = userId
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categoryList = []
  Category.find()
    .lean()
    .then(category => {
      categoryList.push(...category)
    })
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      categoryList.forEach(category => {
        if (category.id === record.category) {
          category.selected = true
        }
      })
      res.render('edit', { record, categoryList })
    })
    .catch(err => console.log(err))
})

// 編輯功能
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const recordsInfo = req.body
  return Record.findByIdAndUpdate({ _id, userId }, recordsInfo)
    .lean()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 刪除功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router