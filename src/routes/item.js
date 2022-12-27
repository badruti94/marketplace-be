const express = require('express')
const { getAllItems, updateItem, deleteItem, createItem, getItemById } = require('../controllers/item')
const { isLoginAdmin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', isLoginAdmin, createItem)
router.put('/:id', isLoginAdmin, updateItem)
router.delete('/:id', isLoginAdmin, deleteItem)

module.exports = router