const router = require('express').Router()
const {
    findAll, 
    findById, 
    add, 
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
    .put('/:id',
        isAuth,
        multer.single('image'),
        sendUploadToGCS,
        update)
    .put('/:id/noImage', isAuth, updateNoImage)
    .delete('/:id', isAuth, remove)

module.exports = router