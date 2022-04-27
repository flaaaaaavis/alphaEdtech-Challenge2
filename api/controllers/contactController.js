const pool = require('../database')

class contact {
    async createContact(req, res) {
        const productData = [req.body.ddd, req.body.phone, req.body.email];
        const transaction = `BEGIN TRANSACTION`;
        const addProduct = `INSERT INTO contacts (ddd, phone, email) VALUES ($1, $2, $3)`;
        try {
            await pool.query(transaction);
            await pool.query(addProduct, productData);
            await pool.query(`COMMIT`);
            res.sendStatus(201)
        } catch (e) {
            console.error(e)
        }
    }
    async readAllContacts(req, res) {
        try {
            const all = await pool.query("SELECT * FROM contacts WHERE deleted = false");
            res.json(all.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readContactById(req, res) {
        const { id } = req.body;
        try {
            const product = await pool.query("SELECT * FROM contacts WHERE contact_id = $1 AND DELETED = false", [id]);
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async readDeletedContacts(req, res) {
        try {
            const product = await pool.query("SELECT * FROM contacts WHERE deleted = true");
            res.json(product.rows);
        } catch (err) {
            console.error(err.message)
        }
    }
    async updateContact(req, res) {
        const { ddd, phone, email, id } = req.body;
        // console.log(req.body);
        try {
            await pool.query(
                "UPDATE contacts SET ddd = $1, phone = $2, email = $3 WHERE contact_id = $4 AND deleted = false" ,
                [ddd, phone, email, id]
            );
            res.status(200).send({ message: "User Updated Successfully!" });
        } catch (e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
    async deleteContact(req, res) {
        try {
            const sql = "UPDATE contacts SET deleted = $1 WHERE contact_id = $2;";
            const values = [true, req.body.id];
            await pool.query(sql, values);
            console.log("Remoção de usuário bem sucedida!");

            const sqlResult = "SELECT * FROM contacts WHERE deleted = $1;";
            const valuesResult = [false];
            await pool.query(sqlResult, valuesResult);
        } catch(e) {
            console.log("Ocorreu um erro na conexão.\n" + e);
        }
    }
}

module.exports = contact;