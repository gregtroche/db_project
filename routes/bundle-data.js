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
        res.render('../views/pages/bundle-data', {bundle_data: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO bundle_data (name, image, event_id, price, last_updated) VALUES('${req.body.bundleName}', '${req.body.bundleImage}', ${req.body.eventId}, ${req.body.bundlePrice}, now());`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `DELETE FROM bundle_data WHERE id=${req.body.bundleId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        const updateQuery = `UPDATE bundle_data SET name='${req.body.bundleName}', image='${req.body.bundleImage}', event_id=${req.body.eventId}, price=${req.body.bundlePrice}, last_updated=now() WHERE id=${req.body.bundleId};`;
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;