const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('http-errors')
const Replicate = require('replicate')
const { getInfo } = require('../helpers/scraper')
const { translate } = require('@vitalets/google-translate-api')

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const diffusionServices = {
  createDiffusion: async (req, cb) => {
    try {
      const { description } = req.body
      const { title, ISBN, coverImg } = await getInfo(description)
      const { text } = await translate(title, { to: 'en' })
      const link = await replicate.run(
        process.env.REPLICATE_PROJECT,
        {
          input: {
            prompt: text
          }
        })
      const bookData = await prisma.book.create({
        data: {
          ISBN,
          title,
          coverImg
        }
      })

      const diffusionData = {
        description,
        link: link[0],
        authorId: req.user.id,
        bookId: bookData.id
      }
      await prisma.diffusion.create({ data: diffusionData })
      return cb(null, diffusionData)
    } catch (error) {
      return cb(error)
    }
  },
  collectDiffusion: async (req, cb) => {
    try {
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
      await prisma.collection.create({
        data: {
          authorId: req.user.id,
          diffusionId: diffusion.id
        }
      })
      return cb(null, {
        authorId: req.user.id,
        diffusionId: diffusion.id
      })
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = diffusionServices