const express = require('express')
const router = express.Router()

// controllers
const { listTransactions, createTransaction } = require('../controllers/transaction.controller')

router.get('/transactions', listTransactions)
router.post('/transaction', createTransaction)



module.exports = router