const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class session {
    async login(req, res) {
        const { username, password } = req.body;

        

        bcrypt.compare(password, hash).then(function(result) {
            // result == true
        });


        try {
            const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
            res.json(user.rows[0]);

            if(username === res.body.username && password === res.body.password) {
                let id = res.body.user_id;
                const token = jwt.sign({id}, SECRET, {expiresIn: 300});
                res.json({auth: true, token});
            }
        } catch (err) {
            console.error(err.message);
            res.status(401).end();
        } 
    }
}

module.exports = session