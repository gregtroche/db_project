const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT * FROM schools';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/schools', {schools: result})
    });
})

router.post('/', (req,res) => {
    if(req.body.submissionType === 'create'){
        const createQuery = `INSERT INTO schools (name, active, last_updated) VALUES('${req.body.schoolName}', ${req.body.active}, now());`;
        const submission = database.query(createQuery);
        submission.then(function(result){
            console.log('Submission Successful!')
        });

        const readAllQuery = 'SELECT * FROM schools';
        const data = database.query(readAllQuery);
        data.then(function(result){
        res.render('../views/pages/schools', {schools: result})
        });
    }
    else if(req.body.submissionType === 'delete'){
        const deleteQuery = `DELETE FROM schools WHERE id=${req.body.schoolId};`;
        const deleteItem = database.query(deleteQuery);
        deleteItem.then(function(result){
            console.log('Row Successfully Deleted!')
        });

        const readAllQuery = 'SELECT * FROM schools';
        const data = database.query(readAllQuery);
        data.then(function(result){
        res.render('../views/pages/schools', {schools: result})
        });
    }
})

module.exports = router;