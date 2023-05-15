const passport = require('../config/passport')
const createError = require('http-errors')

const authenticated = (req, res, cb) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) cb(err)
    if (!user) throw createError(401, 'Your token is invalid.')
    req.user = user
    return cb()
  })(req, res, cb)
}

module.exports = {
  authenticated
}