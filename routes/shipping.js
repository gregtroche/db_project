const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM shipping ORDER BY id';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/shipping', {shipping: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO shipping (cost, address, ship_to_school, city, state, zip, event_id, last_updated) VALUES(${req.body.shippingCost}, '${req.body.address}', ${req.body.shipToSchool}, '${req.body.city}', '${req.body.state}', '${req.body.zip}', ${req.body.eventId}, now());`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `DELETE FROM shipping WHERE id=${req.body.shippingId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        let updateQuery = ''
        if(req.body.shipToSchool == 'true'){
            updateQuery = `UPDATE shipping SET cost=${req.body.shippingCost}, address='${req.body.address}', ship_to_school=${req.body.shipToSchool}, city='${req.body.city}', state='${req.body.state}', zip='${req.body.zip}', event_id=${req.body.eventId}, last_updated=now() WHERE id=${req.body.shippingId};`;
        } 
        else{
            updateQuery = `UPDATE shipping SET cost=${req.body.shippingCost}, address=null, ship_to_school=${req.body.shipToSchool}, city=null, state=null, zip=null, event_id=${req.body.eventId}, last_updated=now() WHERE id=${req.body.shippingId};`;
        }
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;