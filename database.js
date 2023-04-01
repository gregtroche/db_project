const { Pool } = require('pg');
//credentials I KNOW THEY SHOULDNT BE HERE

const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
}

const pool = new Pool(credentials);

function query(text) {
    return new Promise((resolve, reject) => {
        pool
        .query(text)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
            console.log(err);
        })
    });
}

module.exports = {
    query
};
