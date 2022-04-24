const pool = require('../database')
const path = require('path')
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
        const cookieToken = req.cookies.token;
        try {
            if(cookieToken) {
                const result = jwt.verify(cookieToken, process.env.SECRET);
                if(result) return true
                else throw new Error('Invalid token');
            } else {
                if(req.url == '/login' || req.url == '/createUser') return true
                else throw new Error('Invalid token');
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const testToken = await this.validateToken(req, res);
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
                    if(result && !testToken) {
                        const string = `${dbData.rows[0].user_id}${dbData.rows[0].email}`;
                        const userId = `${dbData.rows[0].user_id}`;
                        const { token } = this.createToken(string);
                        res.cookie("token", token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none'
                        });
                        res.cookie("userId", userId, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none'
                        });
                        res.status(200).send(result);
                    } else if (result) {
                        // res.sendFile(path.join(__dirname, '../../frontend/', 'createAddress.html'))
                        res.status(200).send( { message: 'Logged in'} );
                    } else {
                        res.status(401).send( { message: 'Wrong password, try again'} )
                    }
                });
            } else res.send( { message: 'User not found'} );
            await pool.query(`COMMIT;`);
        } catch (err) {
            res.status(401).send( { message: 'Try again'} ).end();
            await pool.query(`COMMIT;`);
        }   
    }
}

module.exports = session;