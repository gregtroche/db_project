const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM accessory_products ORDER BY id';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/accessory-products', {accessory_products: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO accessory_products (name, image, price) VALUES('${req.body.accessoryProductName}','${req.body.accessoryProductImage}', ${req.body.accessoryProductPrice});`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `DELETE FROM accessory_products WHERE id=${req.body.accessoryProductId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        const updateQuery = `UPDATE accessory_products SET name='${req.body.accessoryProductName}', image='${req.body.accessoryProductImage}', price=${req.body.accessoryProductPrice} WHERE id=${req.body.accessoryProductId};`;
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;