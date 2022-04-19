const express = require('express')
const router = express.Router()

const pool = require('../database')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// CREATE
    // createContact
    router.post('/createContact', urlencodedParser, async (req, res) => {
        const productData = [req.body.ddd, req.body.phone, req.body.email];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO contacts (ddd, phone, email) VALUES ($1, $2, $3)`;
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
    // readAllContacts
                // localhost:3000/readAllContacts
        router.get('/readAllContacts', async (req, res) => {
            try {
                const all = await pool.query("SELECT * FROM contacts WHERE deleted = false");
                res.json(all.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readProductById
                // localhost:3000/readContactById?id=1
        router.get('/readContactById', async (req, res) => {
            const { id } = req.query;
            try {
                const product = await pool.query("SELECT * FROM contacts WHERE contact_id = $1 AND DELETED = false", [id]);
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readDeletedProducts
                // localhost:3000/readDeletedContacts
        router.get('/readDeletedContacts', async (req, res) => {
            try {
                const product = await pool.query("SELECT * FROM contacts WHERE deleted = true");
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })


// UPDATE
    router.put("/updateContact", async (req, res) => {
        const { ddd, phone, email, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE contacts SET ddd = $1, phone = $2, email = $3 WHERE contact_id = $4 AND deleted = false" ,
                [ddd, phone, email, id]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


// DELETE
    router.put('/deleteContact', async (req, res) => {
        try {
            const sql = "UPDATE contacts SET deleted = $1 WHERE contact_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM contacts WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })

module.exports = router