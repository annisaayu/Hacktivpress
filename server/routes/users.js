const router = require('express').Router()
const {allUser, login, register} = require('../controllers/user')

router
    .get('/', allUser)
    .post('/login', login)
    .post('/register', register)

module.exports = router