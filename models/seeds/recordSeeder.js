const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const SEED_USER = require('../seeds/user.json').results
const SEED_RECORD = require('../seeds/record.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    // 創建使用者
    SEED_USER.map(user => {
      const { name, email, password, recordIndex } = user
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      })  // 創建記帳種子資料
        .then(user => {
          const records = recordIndex.map(index => {
            const record = SEED_RECORD[index]
            record.userId = user._id
            return record
          })
          return Record.create(records)
        })
    })
  )
    .then(() => {
      console.log('Users are created.')
      process.exit()
    })
    .catch(err => console.log(err))
})