const Article = require('../models/article')

module.exports = {
  findAll: (req, res) => {
    Article
    .find()
    .populate('author')
    .sort({ createdAt: 'desc' })
    .then(articles => {
      res.status(200).json({
        message: 'Query get all Article success',
        articles
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Query all Article failed',
        err: err.message
      })
    })
  },

  findById: (req, res) => {
    const {id} = req.params
    Article
      .find({
        _id: id
      })
      .populate('author')
      .then(article => {
        res.status(200).json({
          message: 'Query get one Article by id success',
          article
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Query one Article failed',
          err: err.message
        })
      })
  },

  findBy: (req, res) => {
    const {field, value} = req.params
    Article
      .find({
        [field]: value
      })
      .populate('author')
      .then(article => {
        res.status(200).json({
          message: `Query get Article by ${field} success`,
          article
        })
      })
      .catch(err => {
        res.status(400).json({
          message: `Query get Article by ${field} failed`,
          err: err.message
        })
      })
  },

  add: (req, res) => {
    console.log(req.user)
    const {title, content, category} = req.body

    let newArticle = Article ({
      title, content, image: req.imageURL, category, author: req.user.id
    })

    newArticle.save()
    .then(response => {
      res.status(201).json({
        message: 'Add new Article success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Add new Article failed',
        err: err.message
      })
    })
  },

  addComment: (req, res) => {

    let userid = req.headers.decoded.id
    let id = req.params.id
    const {comment} = req.body
    const newComment = {
      user: userid,
      comment
    }

    Article.findByIdAndUpdate(id, {
      $push: {
        comments: newComment
      }
    })
    .then(response => {
      res.status(200).json({
        message: 'Add comment to Article success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Add comment to Article failed',
        err: err.message
      })
    })
  },

  update: (req, res) => {
    let id = req.user.id
    const {title, content, category} = req.body
    
    Article.findByIdAndUpdate({
      _id: id
    }, {
      title, content, category, image: req.imageURL
    })
    .then(response => {
      res.status(200).json({
        message: 'Update Article success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Update Article failed',
        err: err.message
      })
    })
  },

  updateNoImage: (req, res) => {
    const {id, title, content, category} = req.body
    Article.findByIdAndUpdate({
      _id: id
    }, {
      title, content, category
    })
    .then(response => {
      res.status(200).json({
        message: 'Update Article success',
        data: response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Update Article failed',
        err: err.message
      })
    })
  },

  remove: (req, res) => {
    const {id} = req.params

    Article.findByIdAndRemove({
      _id: id
    })
    .then(response => {
      res.status(200).json({
        message: 'Delete Article success',
        article: response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Delete Article failed',
        err: err.message
      })
    })
  }
}