const express = require('express')
const router = express.Router()

const pool = require('../database')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// CREATE
    // createProduct
    router.post('/createProduct', urlencodedParser, async (req, res) => {
        const productData = [req.body.name, req.body.description];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO products (name, description) VALUES ($1, $2)`;
        try {
            // console.log("Entrou no Try");
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            // console.log("Catch")
            // const user = await pool.query(`SELECT id FROM products WHERE deleted = true AND cpf = '${req.body.cpf}'`);
            // console.log("Catch2")
            // const logDeletion = `UPDATE products SET name = $1, password = $2, cpf = $3, username = $4 WHERE id = '${user.rows[0].id}'`;
            
            // if (typeof user.rows[0] === 'undefined') {
            //     await pool.query(`ROLLBACK`);
            //     if(e.code == "23505") res.sendStatus(200).send("Nome de usuário ou cpf ja existente");
            //     console.log(e);
            //     res.sendStatus(500).send("erro");
            // } else{
            //     await pool.query(logDeletion, userData);
            //     await pool.query(`COMMIT`);
            //     res.sendStatus(201);
            // } 
            console.error(e)
        }
    })


// READ
    // readAllProducts
                // localhost:3000/readAllProducts
        router.get('/readAllProducts', async (req, res) => {
            try {
                const all = await pool.query("SELECT * FROM products WHERE deleted = false");
                res.json(all.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readStoreProducts
                // localhost:3000/readStoreProducts
        router.get('/readStoreProducts', async (req, res) => {
            const { store } = req.body;
            try {
                const product = await pool.query("SELECT * FROM products WHERE store_id = $1 AND DELETED = false", [store]);
                res.json(product.rows);
            } catch (err) {
                console.log(err)
            }
        })
    // readProductById
                // localhost:3000/readProductById?id=1
        router.get('/readProductById', async (req, res) => {
            const { id } = req.query;
            try {
                const product = await pool.query("SELECT * FROM products WHERE product_id = $1 AND DELETED = false", [id]);
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readDeletedProducts
                // localhost:3000/readDeletedProducts
        router.get('/readDeletedProducts', async (req, res) => {
            try {
                const product = await pool.query("SELECT * FROM products WHERE deleted = true");
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })


// UPDATE
    router.put("/updateProduct", async (req, res) => {
        const { name, description, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE products SET name = $1, description = $2 WHERE product_id = $3 AND deleted = false" ,
                [name, description, id]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


// DELETE
    router.put('/deleteProduct', async (req, res) => {
        try {
            const sql = "UPDATE products SET deleted = $1 WHERE product_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM products WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


module.exports = router