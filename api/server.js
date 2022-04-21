const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


import address from './controllers/addressController'
const addressControl = new address()

import contact from './controllers/contactController'
const contactControl = new contact()

import product from './controllers/productController'
const productControl = new product()

import size from './controllers/sizeController'
const sizeControl = new size()

import store from './controllers/storeController'
const storeControl = new store()

import user from './controllers/userController'
const userControl = new user()


app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Address
    // CREATE
        app.post('/createAddress', addressControl.createAddress())
    // READ
        // readAllAddresses
                // localhost:3000/readAllAddresses
            app.get('/readAllAddresses', addressControl.readAllAddresses())
        // readAddressById
                // localhost:3000/readAddressById?id=2
            app.get('/readAddressById', addressControl.readAddressById())
        // readDeletedAddresses
                // localhost:3000/readDeletedAddresses
            app.get('/readDeletedAddresses', addressControl.readDeletedAddresses())
    // UPDATE
        app.put("/updateAddress", addressControl.updateAddress())
    // DELETE
        app.put('/deleteAddress', addressControl.deleteAddress())

// Contact
    // CREATE
        // createContact
        app.post('/createContact', contactControl.createContact())
    // READ
        // readAllContacts
                    // localhost:3000/readAllContacts
            app.get('/readAllContacts', contactControl.readAllContacts())
        // readProductById
                    // localhost:3000/readContactById?id=1
            app.get('/readContactById', contactControl.readContactById())
        // readDeletedProducts
                    // localhost:3000/readDeletedContacts
            app.get('/readDeletedContacts', contactControl.readDeletedContacts())
    // UPDATE
        app.put("/updateContact", contactControl.updateContact())
    // DELETE
        app.put('/deleteContact', contactControl.deleteContact())

// Product
    // CREATE
        // createProduct
        app.post('/createProduct', productControl.createProduct)
    // READ
        // readAllProducts
                    // localhost:3000/readAllProducts
            app.get('/readAllProducts', productControl.readAllProducts)
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            app.get('/readStoreProducts', productControl.readStoreProducts)
        // readProductById
                    // localhost:3000/readProductById?id=1
            app.get('/readProductById', productControl.readProductById)
        // readDeletedProducts
                    // localhost:3000/readDeletedProducts
            app.get('/readDeletedProducts', productControl.readDeletedProducts)
    // UPDATE
        app.put("/updateProduct", productControl.updateProduct)
    // DELETE
        app.put('/deleteProduct', productControl.deleteProduct)

// Size
    // CREATE
        // createSize
        router.post('/createSize', sizeControl.createSize())
        // READ
            // readAllSizes
                        // localhost:3000/readAllSizes
                router.get('/readAllSizes', sizeControl.readAllSizes())
            // readSizeById
                        // localhost:3000/readSizeById?id=1
                router.get('/readSizeById', sizeControl.readSizeById())
            // readDeletedSizes
                        // localhost:3000/readDeletedSizes
                router.get('/readDeletedSizes', sizeControl.readDeletedSizes())
        // UPDATE
            router.put("/updateSize", sizeControl.updateSize())
        // DELETE
            router.put('/deleteSize', sizeControl.deleteSize())

// Store
    // CREATE
        // createStore
        router.post('/createStore', storeControl.createStore())
    // READ
        // readAllStores
                    // localhost:3000/readAllStores
            router.get('/readAllStores', storeControl.readAllStores())
        // readStoreProducts
                    // localhost:3000/readStoreProducts
            router.get('/readStoreProducts', storeControl.readStoreProducts())
        // readStoreById
                    // localhost:3000/readStoreById?id=1
            router.get('/readStoreById', storeControl.readStoreById())
        // readDeletedStores
                    // localhost:3000/readDeletedStores
            router.get('/readDeletedStores', storeControl.readDeletedStores())
    // UPDATE
        router.put("/updateStore", storeControl.updateStore())
    // DELETE
        router.put('/deleteStore', storeControl.deleteStore())

// User
    // CREATE
        // createUser
            app.post('/createUser', userControl.createUser())
    // READ
        // readAllUsers
                    // localhost:3000/readAllUsers
            app.get('/readAllUsers', userControl.readAllUsers())
        // readById
                    // localhost:3000/readUserById?id=5
            app.get('/readUserById', userControl.readUserById())
        // readByName
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            /**
             * rota vai buscar os usuarios por nome ou username ou cpf
             * a busca vai ser feita utilizando ilike para pegar partes do termo a ser buscado
             */
            app.get('/findUser', userControl.findUser())
        // By CPF
                    // localhost:3000/readUserByCPF?cpf=81948935007
            app.get('/readUserByCPF', userControl.readUserByCPF())
        // By username
                    // localhost:3000/readUserByUsername?username=teste14
            app.get('/readUserByUsername', userControl.readUserByUsername())
        // Deleted
                    // localhost:3000/readDeletedUsers
            app.get('/readDeletedUsers', userControl.readDeletedUsers())
    // UPDATE
        app.put("/updateUser", userControl.updateUser())
    // DELETE
        app.put('/deleteUser', userControl.deleteUser())


// app.post('/image', imageUpload.single('image'), (req, res) => { 
//     console.log(req.file);
//     res.json('/image api'); 
// });

app.listen(3000, () =>
    console.log('App listening on port 3000')
)
