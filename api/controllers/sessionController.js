const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class session {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            await pool.query(`BEGIN TRANSACTION;`);
            const dbEmail = await pool.query(`SELECT * FROM contacts WHERE email = '${email}';`);
            if (email == dbEmail.rows[0].email) {
                const dbData = await pool.query(`
                    SELECT contacts.email, users.password
                    FROM users
                    INNER JOIN contacts ON users.contact_id=contacts.contact_id;
                `);
                bcrypt.compare(password, dbData.rows[0].password).then((result) => { 
                    if(result == true) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send( { message: 'Wrong password'} )
                    }
                });
            } else res.send( { message: 'User not found'} )
            await pool.query(`COMMIT;`);
        } catch (err) {
            res.status(401).send( { message: 'User not found'} ).end();
            await pool.query(`COMMIT;`);
        }   
    }
}

module.exports = session