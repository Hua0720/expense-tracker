const mongoose = require('mongoose')
const Schema = mongoose.Schema //物件建構子

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
})

module.exports = mongoose.model('Record', recordSchema)