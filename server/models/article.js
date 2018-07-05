const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema ({
  title: String,
  content: String,
  image: String,
  category: {
    type: String,
    enum: ['others', 'tutorial', 'design'],
    default: 'others'
  },
  author: {
    type: String, 
    ref: 'user'
  }
},{
  timestamps: true
})

let article = mongoose.model('article', articleSchema)

module.exports = article