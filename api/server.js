const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const pool = require('./database')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const multer = require('multer')
const jwt = require('jsonwebtoken')

let fileName;
const storage = multer.diskStorage({
    destination: `${__dirname}/uploads/`,
    filename: (req, file, cb) => {
        fileName = `${Date.now()}${path.extname(file.originalname)}`;
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
const user = require('./controllers/userController')
const userControl = new user()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./frontend'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

function authToken(req, res, next) {
    const cookieToken = req.cookies.token;
    const result = jwt.verify(cookieToken, process.env.SECRET);
    if(result) next()
    else res.status(401)
}

// Address
    // CREATE
        app.post('/createAddress', authToken, (req, res) => {
            addressControl.createAddress(req, res)
        })
    // READ
        app.get('/readAllAddresses', authToken, (req, res) => {
            addressControl.readAllAddresses(req, res)
        })
        app.get('/readAddressById', authToken, (req, res) => {
            addressControl.readAddressById(req, res)
        })
        app.get('/readDeletedAddresses', authToken, (req, res) => {
            addressControl.readDeletedAddresses(req, res)
        })
    // UPDATE
        app.put("/updateAddress", authToken, (req, res) => {
            addressControl.updateAddress(req, res)
        })
    // DELETE
        app.put('/deleteAddress', authToken, (req, res) => {
            addressControl.deleteAddress(req, res)
        })

// Contact
    // CREATE
            app.post('/createContact', authToken, (req, res) => {
                contactControl.createContact(req, res)
            })
    // READ
        app.get('/readAllContacts', authToken, (req, res) => {
            contactControl.readAllContacts(req, res)
        })
        app.get('/readContactById', authToken, (req, res) => {
            contactControl.readContactById(req, res)
        })
        app.get('/readDeletedContacts', authToken, (req, res) => {
            contactControl.readDeletedContacts(req, res)
        })
    // UPDATE
        app.put("/updateContact", authToken, (req, res) => {
            contactControl.updateContact(req, res)
        })
    // DELETE
        app.put('/deleteContact', authToken, (req, res) => {
            contactControl.deleteContact(req, res)
        })

// Product
    // image
        app.post('/image', uploadedImage, async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                const { productId } = req.body;
                if(req.file) {
                    try {
                        await pool.query(`INSERT INTO photos(product_id, image_src) VALUEs (${productId}, ${fileName})`);
                        res.status(200).send({ message: 'Uploaded' });
                    } catch (e) {
                        console.log("Ocorreu um erro na conexão.\n" + e);
                        res.send({ message: 'Upload failed'})
                    }
                } else res.send({ message: 'Upload failed'})
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) } 

            
        })
    // Search products
        app.post('/search', async (req, res) => {
            productControl.search(req, res);
        })
        app.post('/search2', async (req, res) => {
            productControl.search2(req, res);
        })
    // CREATE
        app.post('/createProduct', authToken, (req, res) => {
            productControl.createProduct(req, res)
        })
    // READ
        app.get('/readAllProducts', authToken, (req, res) => {
            productControl.readAllProducts(req, res)
        })
        // Get product page
            app.get('/readProductById', authToken, (req, res) => {
                productControl.readProductById(req, res)
            })
        app.get('/readDeletedProducts', authToken, (req, res) => {
            productControl.readDeletedProducts(req, res)
        })
    // UPDATE
        app.put("/updateProduct", authToken, (req, res) => {
            productControl.updateProduct(req, res)
        })
    // DELETE
        app.put('/deleteProduct', authToken, (req, res) => {
            productControl.deleteProduct(req, res)
        })

// Session
    // Login
        app.post('/login', (req, res) => {
            sessionControl.login(req, res)
        })

// User
    // CREATE
            app.post('/createUser', authToken, (req, res) => {
                userControl.createUser(req, res)
            })
    // READ
        app.get('/readAllUsers', authToken, (req, res) => {
            userControl.readAllUsers(req, res)
        })
        app.get('/readUserById', authToken, (req, res) => {
            userControl.readUserById(req, res)
        })
        // findUser
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            app.get('/findUser', authToken, (req, res) => {
                userControl.findUser(req, res)
            })
            app.get('/readUserByCPF', authToken, (req, res) => {
                userControl.readUserByCPF(req, res)
            })
        // Deleted
            app.get('/readDeletedUsers', authToken, (req, res) => {
                userControl.readDeletedUsers(req, res)
            })
    // UPDATE
        app.put("/updateUser", authToken, (req, res) => {
            userControl.updateUser(req, res)
        })
    // DELETE
        app.put('/deleteUser', authToken, (req, res) => {
            userControl.deleteUser(req, res)
        })

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
)