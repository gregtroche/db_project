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

//     else if(req.body.submissionType === 'update'){
//         const updateQuery = `UPDATE events SET name='${req.body.eventName}', school_id=${req.body.schoolId}, ceremony_date='${req.body.ceremonyDate}', website_open_date='${req.body.websiteOpenDate}', website_close_date='${req.body.websiteOpenDate}', active=${req.body.active}, last_updated=now() WHERE id=${req.body.eventId};`;
//         const updateItem = database.query(updateQuery);
//         updateItem.then(function(result){
//             console.log('Row Successfully Updated!')
//         });
//     }
    
//     res.redirect('back');
})

module.exports = router;