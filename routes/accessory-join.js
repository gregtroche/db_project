const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM accessory_group_data ORDER BY event_id, name';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/accessory-join-form', {accessory_groups: result})
    });
})

router.get('/:id', (req, res) => {
    let dbData = {}
    let readAllQuery = `SELECT agd.name as group_name, ap.name as product_name, ap.id as id FROM accessory_products as ap INNER JOIN accessory_group_product_data as agpd ON ap.id = agpd.product_id INNER JOIN accessory_group_data agd ON agpd.group_id = agd.id WHERE agd.id = ${req.params.id};`;
    let data = database.query(readAllQuery);
    data.then(function(result){
        dbData['accessory_join'] = result.rows;
        readAllQuery = `SELECT * FROM accessory_products WHERE id NOT IN (SELECT product_id FROM accessory_group_product_data WHERE group_id = ${req.params.id});`
        data = database.query(readAllQuery);
        data.then(function(result){
            dbData['accessory_products'] = result.rows;
            res.render('../views/pages/accessory-join', dbData);
        });
    });   
})

router.post('/', (req,res) => {
    res.redirect(`${req.body.accessoryGroupId}`);
})

router.post('/:id', (req,res) => {
    const productSubmission = JSON.parse(req.body.productSubmission);
    for(const submission of productSubmission.products){
        const createQuery = `INSERT INTO accessory_group_product_data (product_id, group_id) VALUES(${submission}, ${req.params.id});`;
        const sendQuery = database.query(createQuery);
        sendQuery.then(function(result){
            console.log('Submission Successful!');
        });
    }
    res.redirect('/accessory-join/');
})

module.exports = router;
