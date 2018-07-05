const router = require('express').Router()
const {
    findAll, 
    findById, 
    add, 
    // addComment,
    update,
    updateNoImage, 
    remove,
    findBy
} = require('../controllers/article')
const { multer, sendUploadToGCS } = require('../middlewares/image')
const { isAuth } = require('../middlewares/auth')

router
    .get('/', findAll)
    .get('/:id', findById)
    .get('/:field/:value', findBy)
    .post('/', 
        isAuth,
        multer.single('image'), 
        sendUploadToGCS, 
        add)
    // .post('/:id/addcomment', auth, addComment)
    .put('/',
        isAuth,
        multer.single('image'),
        sendUploadToGCS,
        update)
    .put('/noImage', isAuth, updateNoImage)
    .delete('/:id', isAuth, remove)

module.exports = router