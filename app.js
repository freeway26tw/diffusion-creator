if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = express.Router()

const port = process.env.PORT || 3000
const routes = require('./routes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => console.log(`Server is listening on port ${port}!
Press CTRL + C to stop the process.`))