const pool = require('../database')

class store {
    async createStore(req, res) {
        const productData = [req.body.name, req.body.userId];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO stores (name, user_id) VALUES ($1, $2)`;
        try {
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    }
    async readAllStores(req, res) {
        try {
            const all = await pool.query("SELECT * FROM stores WHERE deleted = false");
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
    async readStoreById(req, res) {
        const { id } = req.query;
        try {
            const product = await pool.query("SELECT * FROM stores WHERE store_id = $1 AND DELETED = false", [id]);
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readDeletedStores(req, res) {
        try {
            const product = await pool.query("SELECT * FROM stores WHERE deleted = true");
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async updateStore(req, res) {
        const { name, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE stores SET name = $1 WHERE store_id = $2 AND deleted = false" ,
                [name, id]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
    async deleteStore(req, res) {
        try {
            const sql = "UPDATE stores SET deleted = $1 WHERE store_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            res.status(200).send({ message: "Deleted Successfully!" });

            const sqlResult = "SELECT * FROM stores WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
}

module.exports = store