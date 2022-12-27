const express = require('express')
const router = express.Router()
const authRoute = require('../routes/auth')
const itemRoute = require('../routes/item')
const checkoutRoute = require('../routes/checkout')
const accountRoute = require('../routes/account')
const favoriteRoute = require('../routes/favorite')
const profileRoute = require('../routes/profile')
const cartRoutes = require('../routes/cart')

router.use('/auth', authRoute)
router.use('/items', itemRoute)
router.use('/checkouts', checkoutRoute)
router.use('/accounts', accountRoute)
router.use('/favorites', favoriteRoute)
router.use('/profile', profileRoute)
router.use('/cart', cartRoutes)

module.exports = router