// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')

// 選擇類別
router.get('/', (req, res) => {
  const categoryId = Number(req.query.categoryId)
  const userId = req.user._id
  // 全部類別
  if (Number(categoryId) === 6) {
    return Record.find({ userId })
      .lean()
      .sort({ date: 'desc' })
      .then((records) => {
        let total = 0
        for (let i = 0; i < records.length; i++) {
          total += records[i].amount
        }
        return res.render('index', { records, total, categoryId })
      })
      .catch((err) => console.log(err))
  }
  // 特類別
  return Record.find({ categoryId, userId })
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let total = 0
      for (let i = 0; i < records.length; i++) {
        total += records[i].amount
      }

      return res.render('index', { records, total, categoryId })
    })
    .catch((err) => console.log(err))
})

module.exports = router
