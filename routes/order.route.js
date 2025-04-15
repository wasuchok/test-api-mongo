const express = require('express')
const router = express.Router()

// controllers
const { listOrders, readOrder, purchase } = require('../controllers/order.controller')

router.get('/orders', listOrders)
router.get('/order/:id', readOrder)
router.post('/purchase', purchase)



module.exports = router