module.exports = {
  apiErrorHandler(err, req, res, cb) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        message: `${err.name}: ${err.message}`
      })
    } else {
      res.status(500).json({
        message: `${err}`
      })
    }
    cb(err)
  }
}
