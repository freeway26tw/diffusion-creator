const userServices = require('../services/user-services')

const userController = {
  signUp: async (req, res, cb) => {
    userServices.signUp(req, (err, data) => err ? cb(err) : res.json(data))
  },
  signIn: async (req, res, cb) => {
    userServices.signIn(req, (err, data) => err ? cb(err) : res.json(data))
  }
}

module.exports = userController