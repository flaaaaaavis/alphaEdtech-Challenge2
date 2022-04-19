const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./controllers/userController')
const productRoutes = require('./controllers/productController')
const addressRoutes = require('./controllers/addressController')
const contactRoutes = require('./controllers/contactController')
const storeRoutes = require('./controllers/storeController')
const sizeRoutes = require('./controllers/sizeController')

app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(productRoutes)
app.use(addressRoutes)
app.use(contactRoutes)
app.use(storeRoutes)
app.use(sizeRoutes)

app.listen(3000, () =>
    console.log('App listening on port 3000')
)
