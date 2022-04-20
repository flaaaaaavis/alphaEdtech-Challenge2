const express = require('express')
const router = express.Router()

const pool = require('../database')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// CREATE
    router.post('/createAddress', urlencodedParser, async (req, res) => {
        console.log("entrou na rota");
        const productData = [req.body.cep, req.body.estado, req.body.cidade, req.body.bairro, req.body.logradouro, req.body.number];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO addresses( cep, estado, cidade, bairro, logradouro, number) VALUES ($1, $2, $3, $4, $5, $6)`;
        console.log(productData);
        try {
            // console.log("Entrou no Try");
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    })


// READ
    // readAllAddresses
                // localhost:3000/readAllAddresses
        router.get('/readAllAddresses', async (req, res) => {
            try {
                const all = await pool.query("SELECT * FROM addresses WHERE deleted = false");
                res.json(all.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readAddressById
                // localhost:3000/readAddressById?id=2
        router.get('/readAddressById', async (req, res) => {
            const { id } = req.query;
            try {
                const product = await pool.query("SELECT * FROM addresses WHERE address_id = $1 AND DELETED = false", [id]);
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })
    // readDeletedAddresses
                // localhost:3000/readDeletedAddresses
        router.get('/readDeletedAddresses', async (req, res) => {
            try {
                const product = await pool.query("SELECT * FROM addresses WHERE deleted = true");
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        })

// UPDATE
    router.put("/updateAddress", async (req, res) => {
        const { id, cep, estado, cidade, bairro, logradouro, number } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE addresses SET cep = $2,estado = $3, cidade = $4, bairro = $5, logradouro = $6, number = $7 WHERE address_id = $1 AND deleted = false" ,
                [ id, cep, estado, cidade, bairro, logradouro, number ]
            );
            res.status(200).send({ message: "Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })

// DELETE
    router.put('/deleteAddress', async (req, res) => {
        try {
            const sql = "UPDATE addresses SET deleted = $1 WHERE address_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM addresses WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    })


module.exports = router