const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.use(new LocalStrategy(
  {
    usernameField: 'account'
  },
  async (account, password, cb) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          account
        }
      })
      const checkPassword = await bcrypt.compare(password, user.password)
      if (!user || !checkPassword) return cb(createError(401, 'Account or password invalid'))
      return cb(null, user, { message: 'Login successfully!' })
    } catch (error) {
      return cb(error)
    }
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: jwtPayload.id
      }
    })
    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
}))

module.exports = passport