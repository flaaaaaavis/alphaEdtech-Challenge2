const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./controllers/userController')
const productRoutes = require('./controllers/productController')

app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(productRoutes)

app.listen(3000, () =>
    console.log('App listening on port 3000')
)
