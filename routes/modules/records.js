// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')

// edit record
router.get('/new', (req, res) => {
  res.render('new')
})

// add record
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Record.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 查看特定一筆資料
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId }) // 改用 findOne 需和資料庫一樣的屬性名稱_id
    .lean()
    .then(records => res.render('edit', { records }))
    .catch(error => console.log(error))
})

// 修改的部分
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(records => {
      records.name = name
      records.date = date
      records.categoryId = Number(categoryId)
      records.amount = amount
      return records.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除的部分
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(records => records.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由器
module.exports = router