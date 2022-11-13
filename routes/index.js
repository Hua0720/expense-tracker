// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


// 建立 middleware 設定檔以後，掛載auth.js
const { authenticator } = require('../middleware/auth')

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')
// 引入 category 模組程式碼
const category = require('./modules/category')
// 引入 users 模組程式碼
const users = require('./modules/users')



// 將網址結構符合 / 字串的 request 導向 records 模組 // 加入驗證程序 authenticator
router.use('/records', authenticator, records)
// 將網址結構符合 /category 字串開頭的 request 導向 category 模組
router.use('/category', category)
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組
router.use('/users', users)
// 將網址結構符合 / 字串的 request 導向 home 模組 // 加入驗證程序 authenticator
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router