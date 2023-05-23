if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const app = express()
const router = express.Router()

const port = process.env.PORT || 3000
const routes = require('./routes')
const passport = require('./config/passport')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: process.env.SESSION_SECRET || 'secret', resave: false, saveUninitialized: false }))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => console.log(`Server is listening on port ${port}!
Press CTRL + C to stop the process.`))