if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = express.Router()
const Replicate = require('replicate')

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const result = await replicate.run(
    process.env.REPLICATE_PROJECT,
    {
      input: {
        prompt: `${req.query.description}`
      }
    })
  return res.json(result)
})

app.listen(port, () => console.log(`Server is listening on port ${port}!
Press CTRL + C to stop the process.`))