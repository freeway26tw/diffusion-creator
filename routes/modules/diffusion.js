const express = require('express')
const router = express.Router()
const Replicate = require('replicate')

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post('/', async (req, res) => {
  const { description } = req.body
  const result = await replicate.run(
    process.env.REPLICATE_PROJECT,
    {
      input: {
        prompt: `${description}`
      }
    })
  return res.json(result)
})

module.exports = router