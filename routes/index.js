const express = require('express')
const router = express.Router()

const diffusion = require('./modules/diffusion')
const users = require('./modules/users')

const userController = require('../controllers/user-controller')

router.post('/users', userController.signUp)

router.use('/users', users)
router.use('/diffusion', diffusion)

module.exports = router