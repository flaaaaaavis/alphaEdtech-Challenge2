const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '0508',
    database: 'adote-facil',
    host: 'localhost',
    port: 5432
})

module.exports = pool