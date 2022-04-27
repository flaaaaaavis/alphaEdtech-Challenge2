const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const sessionController = require('./sessionController')
const sessionControl = new sessionController.session()

class auth {
    createToken(_token) {
        const token = jwt.sign({ _token }, process.env.SECRET, {
          expiresIn: '24h',
        });
        return { token };
    };
    async validateToken(req, res) {
        const cookieToken = req.cookies.token;
        console.log(` token: ${cookieToken}`);
        try {
            if(cookieToken) {
                const result = jwt.verify(cookieToken, process.env.SECRET);
                if(result) return true
                else return false;
            }
            else if(cookieToken === undefined) return false
            else {
                if(req.url == '/login' || req.url == '/createUser') return true
                else return false
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const testToken = await this.validateToken(req, res);
        console.log(` testoken: ${testToken}`);
        try {
            await pool.query(`BEGIN TRANSACTION;`);
            const dbEmail = await pool.query(`SELECT * FROM contacts WHERE email = '${email}';`);
            if (email == dbEmail.rows[0].email) {
                const contactId = dbEmail.rows[0].contact_id;
                const dbData = await pool.query(`
                    SELECT password, user_id
                    FROM users WHERE contact_id = ${contactId};
                `);
                bcrypt.compare(password, dbData.rows[0].password).then((result) => {
                    if(result && !testToken) {
                        const string = `${dbData.rows[0].user_id}${email}`;
                        const { token } = this.createToken(string);
                        res.cookie('token', token, {
                            HttpOnly: true,
                            Secure: true,
                            SameSite: none,
                            overwrite: true
                        })
                        res.status(200).send( {
                            'token': `${token}`,
                            'userId': `${dbData.rows[0].user_id}`
                        });
                    } else if (result) {
                        res.status(200).send( { message: 'Valid token. Logged in'} );
                    } else {
                        res.status(401).send( { message: 'Wrong password, try again'} )
                    }
                });
            } else res.send( { message: 'User not found'} );
            await pool.query(`COMMIT;`);
        } catch (err) {
            console.log(err);
            res.status(401).send( { message: 'Try again'} ).end();
            await pool.query(`COMMIT;`);
        }   
    }
    async logout(req, res) {
        const cookieToken = req.cookies.token;
        const tableToken = sessionControl.findSession(cookieToken);

        if(tableToken !== undefined && tableToken !== null) {
            try {
                sessionControl.deleteSession(cookieToken);
                res.cookie('token', '', {
                    HttpOnly: true,
                    Secure: true,
                    overwrite: true
                });
                res.status(201).send({ message: 'Logged out' });
            } catch (error) {
                console.log(error)
                res.status(401);
            }
        }
    }
}

module.exports = auth;