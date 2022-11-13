// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id // 變數設定
  // 加入查詢條件
  return Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let total = 0

      for (let i = 0; i < records.length; i++) {
        total += records[i].amount
      }
      res.render('index', { records, total })
    })
    .catch((err) => console.log(err))
})

// 匯出路由模組
module.exports = router