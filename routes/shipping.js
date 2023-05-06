const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    let dbData = {};
    let readAllQuery = 'SELECT * FROM shipping ORDER BY id';
    let data = database.query(readAllQuery);
    data.then(function(result){
        dbData['shippingData'] = result.rows;
        readAllQuery = 'SELECT name, id FROM events ORDER BY id;';
        data = database.query(readAllQuery);
        data.then(function(result){
            dbData['eventData'] = result.rows;
            res.render('../views/pages/shipping', dbData);
        })
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        let createQuery = ''
        if(req.body.shipToSchool == 'true'){
            createQuery = `INSERT INTO shipping (cost, address, ship_to_school, city, state, zip, event_id, last_updated) VALUES(${req.body.shippingCost}, '${req.body.address}', ${req.body.shipToSchool}, '${req.body.city}', '${req.body.state}', '${req.body.zip}', ${req.body.eventId}, now());`;
        } else {
            createQuery = `INSERT INTO shipping (cost, address, ship_to_school, city, state, zip, event_id, last_updated) VALUES(${req.body.shippingCost}, null, ${req.body.shipToSchool}, null, null, null, ${req.body.eventId}, now());`;
        }
        
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
            updateQuery = `UPDATE shipping SET cost=${req.body.shippingCost}, address='${req.body.address}', ship_to_school=${req.body.shipToSchool}, city='${req.body.city}', state='${req.body.state}', zip='${req.body.zip}', event_id=${req.body.eventId} WHERE id=${req.body.shippingId};`;
        } 
        else{
            updateQuery = `UPDATE shipping SET cost=${req.body.shippingCost}, address=null, ship_to_school=${req.body.shipToSchool}, city=null, state=null, zip=null, event_id=${req.body.eventId} WHERE id=${req.body.shippingId};`;
        }
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;