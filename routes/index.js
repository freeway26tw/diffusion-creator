const express = require('express')
const router = express.Router()
const passport = require('passport')

const diffusion = require('./modules/diffusion')
const users = require('./modules/users')

const userController = require('../controllers/user-controller')
const { apiErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')

router.post('/api/users', userController.signUp)
router.post('/api/users/signIn', passport.authenticate('local', { session: false }), userController.signIn)

router.use('/api/users', authenticated, users)
router.use('/api/diffusion', authenticated, diffusion)

router.use('/', apiErrorHandler)

module.exports = router