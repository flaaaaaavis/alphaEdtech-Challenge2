const express = require('express')
const app = express()
const port = 3000
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Address
    // CREATE
        app.post('/createAddress', () => {
            addressControl.createAddress()
        })
    // READ
        // readAllAddresses
                // localhost:3000/readAllAddresses
            app.get('/readAllAddresses', () => {
                addressControl.readAllAddresses()
            })
        // readAddressById
                // localhost:3000/readAddressById?id=2
            app.get('/readAddressById', () => {
                addressControl.readAddressById()
            })
        // readDeletedAddresses
                // localhost:3000/readDeletedAddresses
            app.get('/readDeletedAddresses', () => {
                addressControl.readDeletedAddresses()
            })
    // UPDATE
        app.put("/updateAddress", () => {
            addressControl.updateAddress()
        })
    // DELETE
        app.put('/deleteAddress', () => {
            addressControl.deleteAddress()
        })

// Contact
    // CREATE
        // createContact
            app.post('/createContact', () => {
                contactControl.createContact()
            })
    // READ
        // readAllContacts
                    // localhost:3000/readAllContacts
            app.get('/readAllContacts', () => {
                contactControl.readAllContacts()
            })
        // readProductById
                    // localhost:3000/readContactById?id=1
            app.get('/readContactById', () => {
                contactControl.readContactById()
            })
        // readDeletedProducts
                    // localhost:3000/readDeletedContacts
            app.get('/readDeletedContacts', () => {
                contactControl.readDeletedContacts()
            })
    // UPDATE
        app.put("/updateContact", () => {
            contactControl.updateContact()
        })
    // DELETE
        app.put('/deleteContact', () => {
            contactControl.deleteContact()
        })

// Product
    // CREATE
        // createProduct
            app.post('/createProduct', () => {
                productControl.createProduct()
            })
    // READ
        // readAllProducts
                    // localhost:3000/readAllProducts
            app.get('/readAllProducts', () => {
                productControl.readAllProducts()
            })
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            app.get('/readStoreProducts', () => {
                productControl.readStoreProducts()
            })
        // readProductById
                    // localhost:3000/readProductById?id=1
            app.get('/readProductById', () => {
                productControl.readProductById()
            })
        // readDeletedProducts
                    // localhost:3000/readDeletedProducts
            app.get('/readDeletedProducts', () => {
                productControl.readDeletedProducts()
            })
    // UPDATE
        app.put("/updateProduct", () => {
            productControl.updateProduct()
        })
    // DELETE
        app.put('/deleteProduct', () => {
            productControl.deleteProduct()
        })

// Size
    // CREATE
        // createSize
            app.post('/createSize', () => {
                sizeControl.createSize()
            })
        // READ
            // readAllSizes
                        // localhost:3000/readAllSizes
                app.get('/readAllSizes', () => {
                    sizeControl.readAllSizes()
                })
            // readSizeById
                        // localhost:3000/readSizeById?id=1
                app.get('/readSizeById', () => {
                    sizeControl.readSizeById()
                })
            // readDeletedSizes
                        // localhost:3000/readDeletedSizes
                app.get('/readDeletedSizes', () => {
                    sizeControl.readDeletedSizes()
                })
        // UPDATE
            app.put("/updateSize", () => {
                sizeControl.updateSize()
            })
        // DELETE
            app.put('/deleteSize', () => {
                sizeControl.deleteSize()
            })

// Store
    // CREATE
        // createStore
            app.post('/createStore', () => {
                storeControl.createStore()
            })
    // READ
        // readAllStores
                    // localhost:3000/readAllStores
            app.get('/readAllStores', () => {
                storeControl.readAllStores()
            })
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            app.get('/readStoreProducts', () => {
                storeControl.readStoreProducts()
            })
        // readStoreById
                    // localhost:3000/readStoreById?id=1
            app.get('/readStoreById', () => {
                storeControl.readStoreById()
            })
        // readDeletedStores
                    // localhost:3000/readDeletedStores
            app.get('/readDeletedStores', () => {
                storeControl.readDeletedStores()
            })
    // UPDATE
        app.put("/updateStore", () => {
            storeControl.updateStore()
        })
    // DELETE
        app.put('/deleteStore', () => {
            storeControl.deleteStore()
        })

// User
    // CREATE
        // createUser
            app.post('/createUser', (req, res) => {
                // let teste = req.body;
                userControl.createUser(req, res)
            })
    // READ
        // readAllUsers
                    // localhost:3000/readAllUsers
            app.get('/readAllUsers', () => {
                userControl.readAllUsers()
            })
        // readById
                    // localhost:3000/readUserById?id=5
            app.get('/readUserById', () => {
                userControl.readUserById()
            })
        // findUser
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            app.get('/findUser', () => {
                userControl.findUser()
            })
        // By CPF
                    // localhost:3000/readUserByCPF?cpf=81948935007
            app.get('/readUserByCPF', () => {
                userControl.readUserByCPF()
            })
        // By username
                    // localhost:3000/readUserByUsername?username=teste14
            app.get('/readUserByUsername', () => {
                userControl.readUserByUsername()
            })
        // Deleted
                    // localhost:3000/readDeletedUsers
            app.get('/readDeletedUsers', () => {
                userControl.readDeletedUsers()
            })
    // UPDATE
        app.put("/updateUser", () => {
            userControl.updateUser()
        })
    // DELETE
        app.put('/deleteUser', () => {
            userControl.deleteUser()
        })


// app.post('/image', imageUpload.single('image'), (req, res) => { 
//     console.log(req.file);
//     res.json('/image api'); 
// });

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
)
