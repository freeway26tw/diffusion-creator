const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userServices = {
  signUp: async (req, cb) => { 
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
      return cb(null, data)

    } catch (error) {
      return cb(error)
    }
  },
  signIn: async (req, cb) => {
    try {
      const { password, ...userData } = req.user
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })
      cb(null, { token, user: userData })
    } catch (error) {
      cb(error)
    }
  }

}

module.exports = userServices