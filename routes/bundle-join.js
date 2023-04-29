const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM bundle_data ORDER BY event_id, name';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/bundle-join-form', {bundle_data: result})
    });
})

router.get('/:id', (req, res) => {
    let dbData = {}
    let readAllQuery = `SELECT bd.name as bundle_name, bp.name as product_name, bp.id as id FROM bundle_data as bd INNER JOIN bundle_products_data as bpd ON bd.id = bpd.bundle_id INNER JOIN bundle_products bp ON bpd.bundle_product_id = bp.id WHERE bd.id = ${req.params.id};`;
    let data = database.query(readAllQuery);
    data.then(function(result){
        dbData['bundle_join'] = result.rows;
        readAllQuery = `SELECT * FROM bundle_products WHERE id NOT IN (SELECT bundle_product_id FROM bundle_products_data WHERE bundle_id = ${req.params.id});`
        data = database.query(readAllQuery);
        data.then(function(result){
            dbData['bundle_products'] = result.rows;
            res.render('../views/pages/bundle-join', dbData);
        });
    });   
})

router.post('/', (req,res) => {
    res.redirect(`${req.body.bundleId}`);
})

router.post('/:id', (req,res) => {
    console.log(req.body);
    const productSubmission = JSON.parse(req.body.productSubmission)
    console.log(productSubmission)
    console.log(productSubmission.products)
    // for(const submission of productSubmission.products){
    //     const createQuery = `INSERT INTO bundle_products_data (bundle_product_id, bundle_id) VALUES(${submission}, ${req.params.id});`;
    //     const sendQuery = database.query(createQuery);
    //     sendQuery.then(function(result){
    //         console.log('Submission Successful!')
    //     });
    // }
    let createQuery = `INSERT INTO bundle_products_data (bundle_product_id, bundle_id) VALUES`;
    

    for(const [i,submission] of productSubmission.products.entries()){
        createQuery += `(${submission}, ${req.params.id})`;
        console.log(submission);
        if(i !== productSubmission.products.length - 1) {
            createQuery += ','
        }
    }
    createQuery += ';'
    console.log(createQuery);
    res.redirect('/bundle-join/')  
})

module.exports = router;
