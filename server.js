const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
const dbConnection = require('./database/index')

const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(morgan('dev'))


app.use(cors({"Access-Control-Allow-Origin": process.env.CLIENT_URL}))


const authRoutes = require('./routes/auth.route')

app.use(bodyParser.json())
app.use('/api', authRoutes)

dbConnection.mongoDB

const port = process.env.PORT
app.listen(port, () => console.log(`API is running on port ${port}`))
