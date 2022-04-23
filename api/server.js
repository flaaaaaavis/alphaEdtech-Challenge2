const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()

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
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionControl.validateToken)

app.use(cors())

// Address
    // CREATE
        app.post('/createAddress', (req, res) => {
            addressControl.createAddress(req, res)
        })
    // READ
        // readAllAddresses
                // localhost:3000/readAllAddresses
            app.get('/readAllAddresses', (req, res) => {
                addressControl.readAllAddresses(req, res)
            })
        // readAddressById
                // localhost:3000/readAddressById?id=2
            app.get('/readAddressById', (req, res) => {
                addressControl.readAddressById(req, res)
            })
        // readDeletedAddresses
                // localhost:3000/readDeletedAddresses
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
        // createContact
            app.post('/createContact', (req, res) => {
                contactControl.createContact(req, res)
            })
    // READ
        // readAllContacts
                    // localhost:3000/readAllContacts
            app.get('/readAllContacts', (req, res) => {
                contactControl.readAllContacts(req, res)
            })
        // readProductById
                    // localhost:3000/readContactById?id=1
            app.get('/readContactById', (req, res) => {
                contactControl.readContactById(req, res)
            })
        // readDeletedProducts
                    // localhost:3000/readDeletedContacts
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
    // CREATE
        // createProduct
            app.post('/createProduct', (req, res) => {
                productControl.createProduct(req, res)
            })
    // READ
        // readAllProducts
                    // localhost:3000/readAllProducts
            app.get('/readAllProducts', (req, res) => {
                productControl.readAllProducts(req, res)
            })
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            app.get('/readStoreProducts', (req, res) => {
                productControl.readStoreProducts(req, res)
            })
        // readProductById
                    // localhost:3000/readProductById?id=1
            app.get('/readProductById', (req, res) => {
                productControl.readProductById(req, res)
            })
        // readDeletedProducts
                    // localhost:3000/readDeletedProducts
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

// sessionControl.validateToken,

// Session
    // Login
        app.post('/login', (req, res) => {
            sessionControl.login(req, res)
        })

// Size
    // CREATE
        // createSize
            app.post('/createSize', (req, res, next) => {
                sizeControl.createSize(req, res, next)
            })
        // READ
            // readAllSizes
                        // localhost:3000/readAllSizes
                app.get('/readAllSizes', (req, res) => {
                    sizeControl.readAllSizes(req, res)
                })
            // readSizeById
                        // localhost:3000/readSizeById?id=1
                app.get('/readSizeById', (req, res) => {
                    sizeControl.readSizeById(req, res)
                })
            // readDeletedSizes
                        // localhost:3000/readDeletedSizes
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
        // createStore
            app.post('/createStore', (req, res) => {
                storeControl.createStore(req, res)
            })
    // READ
        // readAllStores
                    // localhost:3000/readAllStores
            app.get('/readAllStores', (req, res) => {
                storeControl.readAllStores(req, res)
            })
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            app.get('/readStoreProducts', (req, res) => {
                storeControl.readStoreProducts(req, res)
            })
        // readStoreById
                    // localhost:3000/readStoreById?id=1
            app.get('/readStoreById', (req, res) => {
                storeControl.readStoreById(req, res)
            })
        // readDeletedStores
                    // localhost:3000/readDeletedStores
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
        // createUser
            app.post('/createUser', (req, res) => {
                userControl.createUser(req, res)
            })
    // READ
        // readAllUsers
                    // localhost:3000/readAllUsers
            app.get('/readAllUsers', (req, res) => {
                userControl.readAllUsers(req, res)
            })
        // readById
                    // localhost:3000/readUserById?id=5
            app.get('/readUserById', (req, res) => {
                userControl.readUserById(req, res)
            })
        // findUser
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            app.get('/findUser', (req, res) => {
                userControl.findUser(req, res)
            })
        // By CPF
                    // localhost:3000/readUserByCPF?cpf=81948935007
            app.get('/readUserByCPF', (req, res) => {
                userControl.readUserByCPF(req, res)
            })
        // Deleted
                    // localhost:3000/readDeletedUsers
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


// app.post('/image', imageUpload.single('image'), (req, res) => { 
//     console.log(req.file);
//     res.json('/image api'); 
// });

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
)
