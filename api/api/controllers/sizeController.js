const express = require('express')
const router = express.Router()

const pool = require('../database')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// CREATE
    // createSize
    router.post('/createSize', urlencodedParser, async (req, res) => {
        const productData = [req.body.size, req.body.height, req.body.width, req.body.depth];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO sizes (size, height, width, depth) VALUES ($1, $2, $3, $4)`;
        try {
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    })


// READ
    // readAllSizes
                // localhost:3000/readAllSizes
        router.get('/readAllSizes', async (req, res) => {
            try {
                const all = await pool.query("SELECT * FROM sizes WHERE deleted = false");
                res.json(all.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readSizeById
                // localhost:3000/readSizeById?id=1
        router.get('/readSizeById', async (req, res) => {
            const { id } = req.query;
            try {
                const product = await pool.query("SELECT * FROM sizes WHERE size_id = $1 AND DELETED = false", [id]);
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readDeletedSizes
                // localhost:3000/readDeletedSizes
        router.get('/readDeletedSizes', async (req, res) => {
            try {
                const product = await pool.query("SELECT * FROM sizes WHERE deleted = true");
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })


// UPDATE
    router.put("/updateSize", async (req, res) => {
        const { size, height, width, depth, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE sizes SET size = $1, height = $2, width = $3, depth = $4 WHERE size_id = $5 AND deleted = false" ,
                [ size, height, width, depth, id ]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


// DELETE
    router.put('/deleteSize', async (req, res) => {
        try {
            const sql = "UPDATE sizes SET deleted = $1 WHERE size_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM sizes WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


module.exports = router