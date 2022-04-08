const express = require('express')
const app = express()
const pool = require('./database')
const cors = require('cors')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ROUTES
    // CREATE
        app.post('/create', urlencodedParser, async (req, res) => {
            let admin = false;
            let ong = false;
            if (req.body.account == 'admin') {
                admin = true;
            } else if (req.body.account == 'ong') {
                ong = true;
            }
            const userData = [req.body.name, req.body.pass, req.body.cpf, req.body.user, admin, ong, false];
            const transaction = `BEGIN TRANSACTION`;
            const addUser = `INSERT INTO users (name, password, cpf, username, admin, ong, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            try {
                // console.log("Entrou no Try");
                await pool.query(transaction);
                await pool.query(addUser, userData);
                await pool.query(`COMMIT`);
                res.sendStatus(201)
            } catch (e) {
                console.log("Catch")
                const user = await pool.query(`SELECT id FROM users WHERE deleted = true AND cpf = '${req.body.cpf}'`);
                console.log("Catch2")
                const logDeletion = `UPDATE users SET name = $1, password = $2, cpf = $3, username = $4, admin = $5, ong = $6, deleted = $7 WHERE id = '${user.rows[0].id}'`;
                
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
        // View all users
            app.get('/users', async (req, res) => {
                try {
                    const allUsers = await pool.query("SELECT * FROM users WHERE deleted = false");
                    res.json(allUsers.rows);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // By id
            app.get('/id/', async (req, res) => {
                const { id } = req.query;
                try {
                    const user = await pool.query("SELECT * FROM users WHERE id = $1 AND DELETED = FALSE", [id]);
                    res.json(user.rows);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // By name
            app.get('/name/', async (req, res) => {
                const { name } = req.query;
                try {
                    const user = await pool.query("SELECT * FROM users WHERE name = $1 AND deleted = false", [name]);
                    res.json(user.rows[0]);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // By CPF
            app.get('/cpf', async (req, res) => {
                const { cpf } = req.query;
                try {
                    const user = await pool.query("SELECT * FROM users WHERE cpf = $1 AND deleted = false", [cpf]);
                    res.json(user.rows[0]);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // By username
            app.get('/user', async (req, res) => {
                const { username } = req.query;
                try {
                    const user = await pool.query("SELECT * FROM users WHERE username = $1 AND deleted = false", [username]);
                    res.json(user.rows[0]);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // Deleted
            app.get('/deleted', async (req, res) => {
                try {
                    const user = await pool.query("SELECT * FROM users WHERE deleted = true");
                    res.json(user.rows);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // Admin
            app.get('/admin', async (req, res) => {
                try {
                    const user = await pool.query("SELECT * FROM users WHERE admin = true AND deleted = false");
                    res.json(user.rows);
                } catch (err) {
                    console.error(err.message)
                }
            })
        // Ong
            app.get('/ong', async (req, res) => {
                try {
                    const user = await pool.query("SELECT * FROM users WHERE ong = true AND deleted = false");
                    res.json(user.rows);
                } catch (err) {
                    console.error(err.message)
                }
            })

    // UPDATE
        app.put("/update", async (req, res) => {
            const { name, pass, cpf, user, account } = req.body;
            let admin = false;
            let ong = false;
            if(account == 'admin'){
                admin = true;
            }else if (account == 'ong'){
                ong = true;
            }
            console.log(req.body);
            try {
                await pool.query(
                    "UPDATE users SET name = $1, password = $2, username = $4, admin = $5, ong = $6 WHERE cpf = $3 AND deleted = false" ,
                    [name, pass, cpf, user, admin, ong]
                );
                res.status(200).send({ message: "User Updated Successfully!" });
            } catch (e) {
                console.log("Ocorreu um erro na conexão.\n" + e);
            }
        })

    // DELETE
        app.put('/delete', async (req, res) => {
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


app.listen(3000, () => 
    console.log('App listening on port 3000')
)
