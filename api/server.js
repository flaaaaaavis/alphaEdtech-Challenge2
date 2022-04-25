const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const multer = require('multer')
const Uppy = require('@uppy/core')
const XHRUpload = require('@uppy/xhr-upload')
const Dashboard = require('@uppy/dashboard')

const storage = multer.diskStorage({
    destination: `${__dirname}/uploads/`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const uploadedImage = multer({storage}).single('photo');

// Controlers
const address = require('./controllers/addressController')
const addressControl = new address()
const contact = require('./controllers/contactController')
const contactControl = new contact()
const product = require('./controllers/productController')
const productControl = new product()
const session = require('./controllers/sessionController')
const sessionControl = new session()
const size = require('./controllers/sizeController')
const sizeControl = new size()
const store = require('./controllers/storeController')
const storeControl = new store()
const user = require('./controllers/userController')
const userControl = new user()

app.use(express.static('./frontend'))
// app.use( cors() )
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Address
    // CREATE
        app.post('/createAddress', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) addressControl.createAddress(req, res)
            else res.status(401).send({ message:'Log into your account'})
        })
    // READ
        app.get('/readAllAddresses', (req, res) => {
            addressControl.readAllAddresses(req, res)
        })
        app.get('/readAddressById', (req, res) => {
            addressControl.readAddressById(req, res)
        })
        app.get('/readDeletedAddresses', (req, res) => {
            addressControl.readDeletedAddresses(req, res)
        })
    // UPDATE
        app.put("/updateAddress", (req, res) => {
            addressControl.updateAddress(req, res)
        })
    // DELETE
        app.put('/deleteAddress', (req, res) => {
            addressControl.deleteAddress(req, res)
        })

// Contact
    // CREATE
            app.post('/createContact', (req, res) => {
                contactControl.createContact(req, res)
            })
    // READ
        app.get('/readAllContacts', (req, res) => {
            contactControl.readAllContacts(req, res)
        })
        app.get('/readContactById', (req, res) => {
            contactControl.readContactById(req, res)
        })
        app.get('/readDeletedContacts', (req, res) => {
            contactControl.readDeletedContacts(req, res)
        })
    // UPDATE
        app.put("/updateContact", (req, res) => {
            contactControl.updateContact(req, res)
        })
    // DELETE
        app.put('/deleteContact', (req, res) => {
            contactControl.deleteContact(req, res)
        })

// Product
    // image
        app.post('/image', uploadedImage, (req, res) => {
            if(req.file) return res.json({ message: 'Uploaded'})
            else res.send({ message: 'Upload failed'})
        })
    // CREATE
            app.post('/createProduct', (req, res) => {
                productControl.createProduct(req, res)
            })
    // READ
        app.get('/readAllProducts', (req, res) => {
            productControl.readAllProducts(req, res)
        })
        app.get('/readStoreProducts', (req, res) => {
            productControl.readStoreProducts(req, res)
        })
        app.get('/readProductById', (req, res) => {
            productControl.readProductById(req, res)
        })
        app.get('/readDeletedProducts', (req, res) => {
            productControl.readDeletedProducts(req, res)
        })
    // UPDATE
        app.put("/updateProduct", (req, res) => {
            productControl.updateProduct(req, res)
        })
    // DELETE
        app.put('/deleteProduct', (req, res) => {
            productControl.deleteProduct(req, res)
        })

// Session
    // Login
        app.post('/login', (req, res) => {
            sessionControl.login(req, res)
        })

// Size
    // CREATE
        app.post('/createSize', (req, res, next) => {
            sizeControl.createSize(req, res, next)
        })
    // READ
        app.get('/readAllSizes', (req, res) => {
            sizeControl.readAllSizes(req, res)
        })
        app.get('/readSizeById', (req, res) => {
            sizeControl.readSizeById(req, res)
        })
        app.get('/readDeletedSizes', (req, res) => {
            sizeControl.readDeletedSizes(req, res)
        })
    // UPDATE
        app.put("/updateSize", (req, res) => {
            sizeControl.updateSize(req, res)
        })
    // DELETE
        app.put('/deleteSize', (req, res) => {
            sizeControl.deleteSize(req, res)
        })

// Store
    // CREATE
            app.post('/createStore', (req, res) => {
                storeControl.createStore(req, res)
            })
    // READ
        app.get('/readAllStores', (req, res) => {
            storeControl.readAllStores(req, res)
        })
        app.get('/readStoreProducts', (req, res) => {
            storeControl.readStoreProducts(req, res)
        })
        app.get('/readStoreById', (req, res) => {
            storeControl.readStoreById(req, res)
        })
        app.get('/readDeletedStores', (req, res) => {
            storeControl.readDeletedStores(req, res)
        })
    // UPDATE
        app.put("/updateStore", (req, res) => {
            storeControl.updateStore(req, res)
        })
    // DELETE
        app.put('/deleteStore', (req, res) => {
            storeControl.deleteStore(req, res)
        })

// User
    // CREATE
            app.post('/createUser', (req, res) => {
                userControl.createUser(req, res);
            })
    // READ
        app.get('/readAllUsers', (req, res) => {
            userControl.readAllUsers(req, res)
        })
        app.get('/readUserById', (req, res) => {
            userControl.readUserById(req, res)
        })
        // findUser
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            app.get('/findUser', (req, res) => {
                userControl.findUser(req, res)
            })
            app.get('/readUserByCPF', (req, res) => {
                userControl.readUserByCPF(req, res)
            })
        // Deleted
            app.get('/readDeletedUsers', (req, res) => {
                userControl.readDeletedUsers(req, res)
            })
    // UPDATE
        app.put("/updateUser", (req, res) => {
            userControl.updateUser(req, res)
        })
    // DELETE
        app.put('/deleteUser', (req, res) => {
            userControl.deleteUser(req, res)
        })

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
)
