const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM events';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/events', {events: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){ 
        const createQuery = `INSERT INTO events (school_id, active, name, ceremony_date, website_open_date, website_close_date, last_updated) VALUES(${req.body.schoolId}, ${req.body.active}, '${req.body.eventName}', '${req.body.ceremonyDate}', '${req.body.websiteOpenDate}', '${req.body.websiteCloseDate}', now());`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });
    }

    else if(req.body.submissionType === 'delete'){ 
        const deleteQuery = `DELETE FROM events WHERE id=${req.body.eventId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });
    }

    else if(req.body.submissionType === 'update'){
        // const updateQuery = `UPDATE schools SET name='${req.body.schoolName}', active=${req.body.active}, last_updated=now() WHERE id=${req.body.schoolId};`;
        // const updateItem = database.query(updateQuery);
        // updateItem.then(function(result){
        //     console.log('Row Successfully Updated!')
        // });
        // console.log(req.body)
        // console.log(updateQuery)
    }
    
    res.redirect('back');
})

module.exports = router;