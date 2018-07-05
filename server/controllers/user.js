const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  allUser: function (req, res, next) {
    User  
      .find()
      .then(users => {
        res.status(200).json({
          message: 'all user',
          users
        })
      })
      .catch( err => {
        res.status(500).json({
          message: 'can not find user',
          err
        })
      })
  },

  signUp: function (req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
      email: req.body.email,
      password: hash,
      role: req.body.role || 'customer'
    })

    newUser
      .save()
      .then(function () {
        res.status(200).json({
          message: 'add user succes',
          user: newUser
        })
      })
      .catch(function (err) {
        res.status(500).json({
          error: err
        })
      })
  },

  signIn: function (req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .exec()
      .then(function(user){
        
        if(user) {
          let isUser =  bcrypt.compareSync(req.body.password, user.password)

          if(isUser) {
            let token = jwt.sign({role: user.role, id: user._id}, process.env.SECRETKEY)
            console.log(token);
            
            res.status(200).json({
              message: "sign in succeed",
              token: token,
              payload: user
            })
          } else {
            res.status(400).json({
              err:err,
              message:"password is wrong"
            })
          }
        } else {
          res.status(400).json({
            message: 'email is not found'
          })
        }
      })
      .catch(function(err){
        res.status(500).json({
          err:err,
          message: "fail to sign user in"
        })
      })
  }
}