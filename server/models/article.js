const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema ({
  title: String,
  content: String,
  image: String,
  category: {
    type: String,
    enum: ['others', 'food', 'design'],
    default: 'others'
  },
  author: {
    type: String, 
    ref: 'user'
  }
},{
  timestamps: true
})

let article = mongoose.model('article', postSchema)

module.exports = article