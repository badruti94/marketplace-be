const express = require('express')
const { getProfile, updateProfile } = require('../controllers/profile')
const router = express.Router()
const { isLogin } = require('../middlewares/auth')

router.get('/', isLogin, getProfile)
router.put('/', isLogin, updateProfile)

module.exports = router