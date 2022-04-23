const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: process.env.SENHA_DB,
    database: process.env.NOME_DB,
    host: process.env.HOST_DB,
    port: process.env.PORTA_DB
})

module.exports = pool