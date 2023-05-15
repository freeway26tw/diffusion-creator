const userServices = require('../services/user-services')

const userController = {
  signUp: async (req, res, cb) => {
    userServices.signUp(req, (error, data) => error ? cb(error) : res.json(data))
  },
  signIn: async (req, res, cb) => {
    userServices.signIn(req, (error, data) => error ? cb(error) : res.json(data))
  }
}

module.exports = userController