const   express = require('express'),
        router = express.Router(),
        database = require('../database');

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM schools';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/schools', {schools: result})
    })
})

module.exports = router;