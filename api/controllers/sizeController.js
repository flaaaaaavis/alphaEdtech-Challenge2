const pool = require('../database')

const session = require('./controllers/sessionController')
const sessionControl = new session()

class size {
    async createSize(req, res) {
        const productData = [req.body.size, req.body.height, req.body.width, req.body.depth];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO sizes (size, height, width, depth) VALUES ($1, $2, $3, $4)`;
        try {
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    }
    async readAllSizes(req, res) {
        try {
            const all = await pool.query("SELECT * FROM sizes WHERE deleted = false");
            res.json(all.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readSizeById(req, res) {
        const { id } = req.query;
        try {
            const product = await pool.query("SELECT * FROM sizes WHERE size_id = $1 AND DELETED = false", [id]);
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readDeletedSizes(req, res) {
        try {
            const product = await pool.query("SELECT * FROM sizes WHERE deleted = true");
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async updateSize(req, res) {
        const { size, height, width, depth, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE sizes SET size = $1, height = $2, width = $3, depth = $4 WHERE size_id = $5 AND deleted = false" ,
                [ size, height, width, depth, id ]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
    async deleteSize(req, res) {
        try {
            const sql = "UPDATE sizes SET deleted = $1 WHERE size_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM sizes WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
}

module.exports = size