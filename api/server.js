const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const pool = require('./database')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const multer = require('multer')

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
const size = require('./controllers/sizeController')
const sizeControl = new size()
const store = require('./controllers/storeController')
const storeControl = new store()
const user = require('./controllers/userController')
const userControl = new user()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./frontend'))
app.use( cors() )
app.use(express.json())
app.use(cookieParser())

// Address
    // CREATE
        app.post('/createAddress', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.createAddress(req, res)
            }
            else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
        })
    // READ
        app.get('/readAllAddresses', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.readAllAddresses(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
            
        })
        app.get('/readAddressById', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.readAddressById(req, res)}
            else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
            
        })
        app.get('/readDeletedAddresses', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.readDeletedAddresses(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
            
        })
    // UPDATE
        app.put("/updateAddress", async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.updateAddress(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
        })
    // DELETE
        app.put('/deleteAddress', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                addressControl.deleteAddress(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
        })

// Contact
    // CREATE
            app.post('/createContact', async (req, res) => {
                const testToken = await sessionControl.validateToken(req, res);
                if (testToken) {
                    contactControl.createContact(req, res)
                } else if(!testToken) {
                    res.status(401).send({ message:'Log into your account'})}
                else {
                    res.status(401).send({ message:'Moiô'}) } 
                })
    // READ
        app.get('/readAllContacts', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                contactControl.readAllContacts(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) } 
            })
        app.get('/readContactById', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                contactControl.readContactById(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        app.get('/readDeletedContacts', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                contactControl.readDeletedContacts(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) } 
        })
    // UPDATE
        app.put("/updateContact", async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                contactControl.updateContact(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // DELETE
        app.put('/deleteContact', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                contactControl.deleteContact(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
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
    // Add product to cart
        app.post('/addToCart', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                sessionControl.addToCart(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // Remove product from cart
        app.post('/deleteFromCart', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                sessionControl.deleteFromCart(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // CREATE
        app.post('/createProduct', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.createProduct(req, res)}
            else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'})
            }
        })
    // READ
        app.get('/readAllProducts', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.readAllProducts(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        app.get('/readStoreProducts', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.readStoreProducts(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        app.get('/readProductById', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.readProductById(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        app.get('/readDeletedProducts', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.readDeletedProducts(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // UPDATE
        app.put("/updateProduct", async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.updateProduct(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // DELETE
        app.put('/deleteProduct', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                productControl.deleteProduct(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })

// Session
    // Login
        app.post('/login', (req, res) => {
            sessionControl.login(req, res)
        })

// User
    // CREATE
            app.post('/createUser', async (req, res) => {
                const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.createUser(req, res);
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
            })
    // READ
        app.get('/readAllUsers', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.readAllUsers(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        app.get('/readUserById', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.readUserById(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
        // findUser
                    // localhost:3000/readUserByName?name=Alvito+Peralta
            app.get('/findUser', async (req, res) => {
                const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.findUser(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
            })
            app.get('/readUserByCPF', async (req, res) => {
                const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.readUserByCPF(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
            })
        // Deleted
            app.get('/readDeletedUsers', async (req, res) => {
                const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.readDeletedUsers(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
            })
    // UPDATE
        app.put("/updateUser", async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.updateUser(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })
    // DELETE
        app.put('/deleteUser', async (req, res) => {
            const testToken = await sessionControl.validateToken(req, res);
            if (testToken) {
                userControl.deleteUser(req, res)
            } else if(!testToken) {
                res.status(401).send({ message:'Log into your account'})}
            else {
                res.status(401).send({ message:'Moiô'}) }
        })

app.listen(port, () =>
    console.log(`App listening on port ${port}`)
)
