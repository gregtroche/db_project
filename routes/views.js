const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('../views/pages/views');
})

router.get('/event-view', (req, res) => {
    const readAllQuery = 'SELECT * FROM active_events ORDER BY ceremony_date;';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/event-view', {view: result})
    });
})

router.get('/shipping-view', (req, res) => {
    const readAllQuery = 'SELECT * FROM ship_to_school;';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/shipping-view', {view: result})
    });
})


module.exports = router;