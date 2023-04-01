const database = require('./database');

const Schools = {
    async readAll(req, res) {
        try {
            const readAllQuery = 'SELECT * FROM schools';
            const { rows } = await database.query(readAllQuery);
            return res.send({ rows });
        } catch(error) {
            return res.send(error);
        }
    }
};

module.exports = Schools;