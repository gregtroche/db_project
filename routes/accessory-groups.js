const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    let dbData = {}
    let readAllQuery = 'SELECT * FROM accessory_group_data ORDER BY event_id, name';
    let data = database.query(readAllQuery);
    data.then(function(result){
        dbData['accessoryData'] = result.rows;
        readAllQuery = 'SELECT id, name FROM events ORDER BY id;';
        data = database.query(readAllQuery);
        data.then(function(result){
            dbData['eventData'] = result.rows;
            res.render('../views/pages/accessory-groups', dbData)
        })
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO accessory_group_data (name, event_id, last_updated) VALUES('${req.body.accessoryGroupName}', ${req.body.accessoryGroupEventId}, now());`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `CALL delete_accessory_group(${req.body.accessoryGroupId});`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        const updateQuery = `UPDATE accessory_group_data SET name='${req.body.accessoryGroupName}', event_id=${req.body.accessoryGroupEventId}, last_updated=now() WHERE id=${req.body.accessoryGroupId};`;
        const updateItem = database.query(updateQuery);
        updateItem.then(function(result){
            console.log('Row Successfully Updated!')
        });
    }
    
    res.redirect('back');
})

module.exports = router;