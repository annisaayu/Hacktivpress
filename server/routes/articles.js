const router = require('express').Router()
const {
    findAll, 
    findById, 
    add, 
    addComment,
    update,
    updateNoImage, 
    remove} = require('../controllers/article')
const { multer, sendUploadToGCS } = require('../middlewares/image')
const { isAuth } = require('../middlewares/auth')

router
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', 
        multer.single('image'), 
        sendUploadToGCS, 
        add)
    // .post('/:id/addcomment', auth, addComment)
    .put('/', 
        multer.single('image'),
        sendUploadToGCS,
        update)
    .put('/noImage', updateNoImage)
    .delete('/:id', remove)

module.exports = router