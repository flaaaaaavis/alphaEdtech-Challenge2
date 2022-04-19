const express = require('express')
const router = express.Router()

const pool = require('../database')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// CREATE
    // createUser
    router.post('/createUser', urlencodedParser, async (req, res) => {
        const userData = [req.body.name, req.body.pass, req.body.cpf, req.body.user];
        const transaction = `BEGIN TRANSACTION`;
        const addUser = `INSERT INTO users (name, password, cpf, username) VALUES ($1, $2, $3, $4)`;
        try {
            // console.log("Entrou no Try");
            await pool.query(transaction);
            await pool.query(addUser, userData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            // console.log("Catch")
            const user = await pool.query(`SELECT id FROM users WHERE deleted = true AND cpf = '${req.body.cpf}'`);
            // console.log("Catch2")
            const logDeletion = `UPDATE users SET name = $1, password = $2, cpf = $3, username = $4 WHERE id = '${user.rows[0].id}'`;
            
            if (typeof user.rows[0] === 'undefined') {
                await pool.query(`ROLLBACK`);
                if(e.code == "23505") res.sendStatus(200).send("Nome de usuário ou cpf ja existente");
                console.log(e);
                res.sendStatus(500).send("erro");
            } else{
                await pool.query(logDeletion, userData);
                await pool.query(`COMMIT`);
                res.sendStatus(201);
            } 
        }
    })


// READ
// readAllUsers
            // localhost:3000/readAllUsers
    router.get('/readAllUsers', async (req, res) => {
        try {
            const allUsers = await pool.query("SELECT * FROM users WHERE deleted = false");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message)
        }
    })
// readById
            // localhost:3000/readUserById?id=5
    router.get('/readUserById', async (req, res) => {
        const { id } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE user_id = $1 AND DELETED = false", [id]);
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    })
// readByName
            // localhost:3000/readUserByName?name=Alvito+Peralta
    router.get('/readUserByName', async (req, res) => {
        const { name } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE name = $1 AND deleted = false", [name]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    })
// By CPF
            // localhost:3000/readUserByCPF?cpf=81948935007
    router.get('/readUserByCPF', async (req, res) => {
        const { cpf } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE cpf = $1 AND deleted = false", [cpf]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    })
// By username
            // localhost:3000/readUserByUsername?username=teste14
    router.get('/readUserByUsername', async (req, res) => {
        const { username } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE username = $1 AND deleted = false", [username]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    })
// Deleted
            // localhost:3000/readDeletedUsers
    router.get('/readDeletedUsers', async (req, res) => {
        try {
            const user = await pool.query("SELECT * FROM users WHERE deleted = true");
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    })


// UPDATE
router.put("/updateUser", async (req, res) => {
    const { name, pass, cpf, user} = req.body;
    // console.log(req.body);
    try {
        await pool.query(
            "UPDATE users SET name = $1, password = $2, username = $4 WHERE cpf = $3 AND deleted = false" ,
            [name, pass, cpf, user]
        );
        res.status(200).send({ message: "User Updated Successfully!" });
    } catch (e) {
        console.log("Ocorreu um erro na conexão.\n" + e);
    }
})


// DELETE
router.put('/deleteUser', async (req, res) => {
    try {
        // await pool.connect();
        const sql = "UPDATE users SET deleted = $1 WHERE username = $2 AND password = $3;";
        const values = [true, req.body.user, req.body.pass];
        await pool.query(sql, values);
        console.log("Remoção de usuário bem sucedida!");

        const sqlResult = "SELECT * FROM users WHERE deleted = $1;";
        const valuesResult = [false];
        const result = await pool.query(sqlResult, valuesResult);
    } catch(e) {
        console.log("Ocorreu um erro na conexão.\n" + e);
    }
})


module.exports = router