const express = require('express')
const { getAllAccounts, createAccount, updateAccount, deleteAccount, getAccountById } = require('../controllers/account')
const { isLoginAdmin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', isLoginAdmin, getAllAccounts)
router.get('/:id', isLoginAdmin, getAccountById)
router.post('/', isLoginAdmin, createAccount)
router.put('/:id', isLoginAdmin, updateAccount)
router.delete('/:id', isLoginAdmin, deleteAccount)

module.exports = router