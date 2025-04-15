const express = require('express')
const router = express.Router()

// controllers
const { listUsers, createUser, readUser, updateUser, deleteUser, topup } = require('../controllers/user.controller')

router.get('/users', listUsers)
router.post('/user', createUser)
router.get('/user/:email', readUser)
router.put('/user', updateUser)
router.delete('/user/:email', deleteUser)

router.get('/topup/:id/:amount', topup)


module.exports = router