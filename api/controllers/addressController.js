const pool = require('../database')

const session = require('./sessionController')
const sessionControl = new session()

class address {
    // Create
        async createAddress(req, res) {
            const productData = [req.body.cep, req.body.estado, req.body.cidade, req.body.bairro, req.body.logradouro, req.body.number];
            const transaction = `BEGIN TRANSACTION;`;
            const addProduct = `INSERT INTO addresses( cep, estado, cidade, bairro, logradouro, number) VALUES ($1, $2, $3, $4, $5, $6);`;
            console.log(productData);
            try {
                console.log("Entrou no Try");
                await pool.query(transaction);
                await pool.query(addProduct, productData);
                await pool.query(`COMMIT;`);
                res.status(201).send({ message: "Created"} );
            } catch (e) {
                res.send(e)
            }
        }
    // Read
        async readAllAddresses(req, res) {
            try {
                const all = await pool.query("SELECT * FROM addresses WHERE deleted = false");
                res.json(all.rows);
            } catch (err) {
                console.error(err.message)
            }
        }
        async readAddressById(req, res) {
            const { id } = req.query;
            try {
                const product = await pool.query("SELECT * FROM addresses WHERE address_id = $1 AND DELETED = false", [id]);
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        }
        async readDeletedAddresses(req, res) {
            try {
                const product = await pool.query("SELECT * FROM addresses WHERE deleted = true");
                res.json(product.rows);
            } catch (err) {
                console.error(err.message)
            }
        }
    // Update
        async updateAddress(req, res) {
            const { id, cep, estado, cidade, bairro, logradouro, number } = req.body;
            // console.log(req.body);

            const testToken = await sessionControl.validateToken(req, res);

            try {
                if(testToken) {
                    await pool.query(
                        "UPDATE addresses SET cep = $2,estado = $3, cidade = $4, bairro = $5, logradouro = $6, number = $7 WHERE address_id = $1 AND deleted = false" ,
                        [ id, cep, estado, cidade, bairro, logradouro, number ]
                    );
                    res.status(200).send("Updated Successfully!");
                } else res.sendStatus(401).send({ message: 'Efetue login'});
            } catch (e) {
                console.log("Ocorreu um erro na conexão.\n" + e);
            }
        }
    // Delete
        async deleteAddress(req, res) {
            const testToken = await sessionControl.validateToken(req, res);

            try {
                if(testToken) {
                    const sql = "UPDATE addresses SET deleted = $1 WHERE address_id = $2;";
                    const values = [true, req.body.id];
                    await pool.query(sql, values);
                    console.log("Remoção de usuário bem sucedida!");

                    const sqlResult = "SELECT * FROM addresses WHERE deleted = $1;";
                    const valuesResult = [false];
                    await pool.query(sqlResult, valuesResult);
                } else res.sendStatus(401).send({ message: 'Efetue login'});
            } catch(e) {
                console.log("Ocorreu um erro na conexão.\n" + e);
            }
        }
}

module.exports = address;