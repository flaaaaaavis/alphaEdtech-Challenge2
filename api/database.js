const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    password: process.env.BD_PASS,
    database: 'deSacoCheio',
    host: 'localhost',
    port: 5432
})

module.exports = pool