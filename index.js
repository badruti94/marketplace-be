const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const fileUpload = require('express-fileupload')
const routes = require('./src/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(fileUpload())

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port ' + port))