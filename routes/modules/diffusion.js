const express = require('express')
const router = express.Router()

const diffusionController = require('../../controllers/diffusion-controller')

router.post('/', diffusionController.createDiffusion)
router.post('/:diffusionId/collect', diffusionController.collectDiffusion)

module.exports = router