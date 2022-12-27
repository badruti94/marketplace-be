const express = require('express')
const { checkout, getAllOrders, getOrderDetail, payOrder, sendOrder, receiveOrder } = require('../controllers/checkout')
const { isLogin, isLoginAdmin } = require('../middlewares/auth')
const router = express.Router()

router.post('/', isLogin, checkout)
router.get('/', isLogin, getAllOrders)
router.get('/:id', isLogin, getOrderDetail)
router.post('/:id/pay', isLogin, payOrder)
router.patch('/:id/send', isLoginAdmin, sendOrder)
router.patch('/:id/receive', isLogin, receiveOrder)

module.exports = router