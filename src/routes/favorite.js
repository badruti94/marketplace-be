const express = require('express')
const { addToFavorite, getItemsFromFavorite, deleteItemFromFavorite, isFavorite } = require('../controllers/favorite')
const { isLogin } = require('../middlewares/auth')
const router = express.Router()

router.post('/', isLogin, addToFavorite)
router.get('/', isLogin, getItemsFromFavorite)
router.get('/:id/is-favorite', isLogin, isFavorite)
router.delete('/:id', isLogin, deleteItemFromFavorite)

module.exports = router