const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class user {
    async createUser(req, res) {
        const { name, cpf, birthdate, email, password, ddd, phone } = req.body;
        const saltRounds = 12;
        let hashedPass;
        let contactId;
        
        bcrypt.hash(password, saltRounds).then(async (hash) => {
            hashedPass = `${hash}`;
            try {
                await pool.query(`BEGIN TRANSACTION;`);
                await pool.query(`INSERT INTO contacts (email, ddd, phone) VALUES ('${email}', ${ddd}, ${phone});`);
                const selected = await pool.query(`SELECT contact_id FROM contacts WHERE email = '${email}';`);
                contactId = selected.rows[0].contact_id;

                await pool.query(`INSERT INTO users (name, cpf, birthdate, contact_id, password) VALUES ('${name}', '${cpf}', '${birthdate}', ${contactId}, '${hashedPass}');`);
                await pool.query(`COMMIT;`);
                res.status(201).send( { message: 'Created' } );
            } catch (e) {
                console.log(e);
                res.send( { message: 'Try again'} );
            }
        })   
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
        const { id } = req.body;
        try {
            const user = await pool.query("SELECT * FROM users WHERE user_id = $1 AND DELETED = false", [id]);
            res.json(user.rows);
        } catch (err) {
            console.error(err.message)
        }
    }

    async findUser(req, res) {
        /*
        * rota vai buscar os usuarios por nome ou username ou cpf
        * a busca vai ser feita utilizando ilike para pegar partes do termo a ser buscado
        */
        const { name } = req.body;
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
        const { cpf } = req.body;
        try {
            const user = await pool.query("SELECT * FROM users WHERE cpf = $1 AND deleted = false", [cpf]);
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
        const { name, pass, cpf, username} = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE users SET name = $1, password = $2, username = $4 WHERE cpf = $3 AND deleted = false" ,
                [name, pass, cpf, username]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conex??o.\n" + e);
        }
    }

    async deleteUser(req, res) {
        try {
            // await pool.connect();
            const sql = "UPDATE users SET deleted = $1 WHERE username = $2 AND password = $3;";
            const values = [true, req.body.user, req.body.pass];
            await pool.query(sql, values);
            console.log("Remo????o de usu??rio bem sucedida!");

            const sqlResult = "SELECT * FROM users WHERE deleted = $1;";
            const valuesResult = [false];
            const result = await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conex??o.\n" + e);
        }
    }
}

module.exports = user