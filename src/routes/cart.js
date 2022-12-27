const express = require('express')
const { getItems, addItem, plusItem, minusItem } = require('../controllers/cart')
const { isLogin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', isLogin, getItems)
router.post('/', isLogin, addItem)
router.patch('/plus', isLogin, plusItem)
router.patch('/minus', isLogin, minusItem)

module.exports = router