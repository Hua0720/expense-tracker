const bcrypt = require('bcryptjs')
// 載入 .env 的檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

const SEED_User = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    recordIndex: [0, 1, 2, 4]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    recordIndex: [3]
  }
]

const SEED_Record = [
  {
    name: '午餐',
    date: '2022-4-23',
    categoryId: 4,
    amount: 60
  },
  {
    name: '晚餐',
    date: '2022-4-23',
    categoryId: 4,
    amount: 60
  },
  {
    name: '捷運',
    date: '2022-4-24',
    categoryId: 2,
    amount: 120
  },
  {
    name: '電影:驚奇隊長',
    date: '2022-4-23',
    categoryId: 3,
    amount: 220
  },
  {
    name: '租金',
    date: '2022-4-1',
    categoryId: 1,
    amount: 25000
  }
]
db.once('open', () => {
  return Promise.all(
    SEED_User.map(user =>{
      const { name, email, password, recordIndex } = user
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      })
    })
  )
    .then(() => {
      console.log('Record seeder created successfully')
      process.exit() // 關閉這段 Node 執行程序
    })
    .catch((err) => console.log(err))
})


