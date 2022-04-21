const pool = require('../database')

class user {
    async createUser(req, res) {
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
    }
    async readAllUsers(req, res) {
        try {
            const allUsers = await pool.query("SELECT * FROM users WHERE deleted = false");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readUserById(req, res) {
        const { id } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE user_id = $1 AND DELETED = false", [id]);
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async findUser(req, res) {
        const { name } = req.query;
        try {
            const condicao = `name ilike '%${name}%' or username ilike '%${name}%' or cpf ilike '%${name}%'`;
            const query = `SELECT * FROM users WHERE ${condicao} AND deleted = false`;
            const user = await pool.query(query);
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readUserByCPF(req, res) {
        const { cpf } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE cpf = $1 AND deleted = false", [cpf]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readUserByUsername(req, res) {
        const { username } = req.query;
        try {
            const user = await pool.query("SELECT * FROM users WHERE username = $1 AND deleted = false", [username]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readDeletedUsers(req, res) {
        try {
            const user = await pool.query("SELECT * FROM users WHERE deleted = true");
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async updateUser(req, res) {
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
    }
    async deleteUser(req, res) {
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
    }
}

module.exports = user