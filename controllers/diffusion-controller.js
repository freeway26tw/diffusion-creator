const diffusionServices = require('../services/diffusion-services')

const diffusionController = {
  createDiffusion: async (req, res, cb) => {
    diffusionServices.createDiffusion(req, (error, data) => error ? cb(error) : res.json(data))
  },
  collectDiffusion: async (req, res, cb) => {
    diffusionServices.collectDiffusion(req, (error, data) => error ? cb(error) : res.json(data))
  }
}

module.exports = diffusionController