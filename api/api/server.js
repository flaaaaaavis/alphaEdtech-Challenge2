const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config()

app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.listen(3000, () =>
    console.log('App listening on port 3000')
)
