const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const cartControl = require('../../frontend/scripts/cart')

class session {
    createToken(_token) {
        const token = jwt.sign({ _token }, process.env.SECRET, {
          expiresIn: 86400,
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
                        res.cookie("token", token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none'
                        });
                        res.status(200).send( { message: 'Logged in'} );
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
        try {
            browser.cookies.remove(
                cookieToken               // object
            )
            res.status(200).send( { message: 'Logged out'} )
        } catch (err) {
            console.log(err);
            res.status(401).send( { message: 'Try again'} ).end();
        }   
    }
    // addToCart(req, res) {
    //     const { userId, productId } = req.body;
    //     if(cartControl[userId] === undefined) {
    //         cartControl[userId] = []
    //     }
    //     cartControl[userId].push(productId)
    // }
    // deleteFromCart(req, res) {
    //     const { userId, productId } = req.body;
    //     for( let i = 0; i < userId.length; i++ ){ 
    //         if( userId[i] === productId ) {
    //             userId.splice(i, 1);
    //         }
    //     }
    // }
}

module.exports = session;