// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


// 建立 middleware 設定檔以後，掛載auth.js
const { authenticator } = require('../middleware/auth')

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')
const auth = require('./modules/auth')
// 引入 users 模組程式碼
const users = require('./modules/users')




// 導向 相對應 模組
router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router