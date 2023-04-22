const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    // const readAllQuery = 'SELECT * FROM bundle_data ORDER BY event_id, name';
    // const data = database.query(readAllQuery);
    // data.then(function(result){
    //     res.render('../views/pages/bundle-data', {bundle_data: result})
    // });
    res.render('../views/pages/accessory-join')
})

module.exports = router;