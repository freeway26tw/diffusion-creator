const express = require('express')
const router = express.Router()

const diffusion = require('./modules/diffusion')
const users = require('./modules/users')

router.use('/users', users)
router.use('/diffusion', diffusion)

module.exports = router