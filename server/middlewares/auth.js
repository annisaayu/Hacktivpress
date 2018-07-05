const jwt = require('jsonwebtoken')

module.exports = {
  isAuth ( req, res, next ) {
    try {
      let token = req.headers.token
      let decoded = jwt.verify(token, process.env.SECRETKEY)
      req.user = decoded

      next()

    } catch (err) {
      res.status(401).json({
				message: 'Token is invalid',
				err
			})
    }
  },

  isAuthorized ( req, res, next ) {
    if(req.user.role == 'admin') {
      next()
    } else {
      res.status(401).json({
				message: 'User is not authorized'
			})
    }
  }
}