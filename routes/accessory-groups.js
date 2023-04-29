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
        res.render('../views/pages/accessory-groups', {accessory_data: result})
    });
})

router.get('/test', (req, res) => {
    res.send('testing if this works');
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