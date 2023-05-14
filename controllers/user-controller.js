const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('http-errors')
const bcrypt = require('bcryptjs')

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { account, email, password, checkPassword } = req.body
      const hash = await bcrypt.hash(password, 10)
      const data = JSON.parse(JSON.stringify(req.body))
      const accountInDb = await prisma.user.findFirst({
        where: {
          OR: [
            { account },
            { email }
          ]
        }
      })
      if (password !== checkPassword) throw createError(400, 'Passwords do not match!')
      if (accountInDb) throw createError(409, 'This account or email is already registered')

      data.password = hash
      delete data.checkPassword
      await prisma.user.create({ data })
      return res.json(data)

    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController