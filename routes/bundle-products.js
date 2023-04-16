const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM bundle_products ORDER BY id';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/bundle-products', {bundle_products: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO bundle_products (name) VALUES('${req.body.bundleProductName}');`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `DELETE FROM bundle_products WHERE id=${req.body.bundleProductId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        const updateQuery = `UPDATE bundle_products SET name='${req.body.bundleProductName}' WHERE id=${req.body.bundleProductId};`;
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;