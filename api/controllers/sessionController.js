const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class session {
    createToken(_token) {
        const token = jwt.sign({ _token }, process.env.SECRET, {
          expiresIn: 86400,
        });
      
        return { token };
    };
    async validateToken(req, res) {
        const cookieToken = req.cookies;
        console.log(cookieToken);
        try {
            // if(cookieToken) {
                const result = jwt.verify(req.cookies, process.env.SECRET);
            //     if(result) next()
            //     else throw new Error('Invalid token');
            // } else {
            //     if(req.url == '/login' || req.url == '/createUser') next()
            //     else throw new Error('Invalid token');
            // }
        } catch (error) {
            console.log(error);
        }
        console.log("MIDDLEWARE"); 
    }
    async login(req, res) {
        await this.validateToken(req, res);
        console.log("LOGIN");
        const { email, password } = req.body;
        try {
            await pool.query(`BEGIN TRANSACTION;`);
            const dbEmail = await pool.query(`SELECT * FROM contacts WHERE email = '${email}';`);
            if (email == dbEmail.rows[0].email) {
                const dbData = await pool.query(`
                    SELECT contacts.email, users.password, users.user_id
                    FROM users
                    INNER JOIN contacts ON users.contact_id=contacts.contact_id;
                `);
                bcrypt.compare(password, dbData.rows[0].password).then((result) => { 
                    if(result == true) {
                        const { token } = this.createToken(dbData.rows[0].user_id);
                        res.cookie("token", token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none'
                        });
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