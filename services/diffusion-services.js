const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('http-errors')
const Replicate = require('replicate')

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const diffusionServices = {
  createDiffusion: async (req, cb) => {
    const { description } = req.body
    const result = await replicate.run(
      process.env.REPLICATE_PROJECT,
      {
        input: {
          prompt: `${description}`
        }
      })
    return cb(null, result)
  },
  collectDiffusion: async (req, cb) => {
    const { diffusionId } = req.params
    const diffusion = await prisma.diffusion.findUnique({
      where: {
        id: diffusionId
      }
    })
    const collection = await prisma.collection.findFirst({
      where: {
        authorId: req.user.id,
        diffusionId: diffusion.id
      }
    })
    if (!diffusion) throw (createError(404, "Diffusion doesn't exist!"))
    if (collection) throw (createError(409, 'You have already collected this diffusion!'))
    prisma.collection.create({
      data: {
        authorId: req.user.id,
        diffusionId: diffusion.id
      }
    })
    return cb(null, {
      authorId: req.user.id,
      diffusionId: diffusion.id
    })
  }
}

module.exports = diffusionServices