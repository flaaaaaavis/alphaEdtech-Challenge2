const pool = require('../database')

const session = require('./sessionController')
const sessionControl = new session()

class product {
    async createProduct(req, res) {
        const productData = [req.body.name, req.body.description, req.body.model];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO products (name, description, model) VALUES ($1, $2, $3)`;
        try {
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    }
    async readAllProducts(req, res) {
        try {
            const all = await pool.query("SELECT * FROM products WHERE deleted = false");
            res.json(all.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readStoreProducts(req, res) {
        const { store } = req.body;
        try {
            const product = await pool.query("SELECT * FROM products WHERE store_id = $1 AND DELETED = false", [store]);
            res.json(product.rows);
        } catch (err) {
            console.log(err)
        }
    }
    async readProductById(req, res) {
        const { id } = req.query;
        try {
            const product = await pool.query("SELECT * FROM products WHERE product_id = $1 AND DELETED = false", [id]);
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readDeletedProducts(req, res) {
        try {
            const product = await pool.query("SELECT * FROM products WHERE deleted = true");
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async updateProduct(req, res) {
        const { name, description, model, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE products SET name = $1, description = $2, model = $3 WHERE product_id = $3 AND deleted = false" ,
                [name, description, model, id]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
    async deleteProduct(req, res) {
        try {
            const sql = "UPDATE products SET deleted = $1 WHERE product_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM products WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
}


module.exports = product