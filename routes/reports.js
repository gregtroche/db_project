const   express = require('express'),
        router = express.Router(),
        database = require('../database'),
        bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const readAllQuery = 'SELECT id, name FROM schools ORDER BY id;';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/reports', {schools: result})
    });
})

router.post('/', (req,res) => {
    res.redirect(`${req.body.schoolId}`);
})

router.get('/:id', (req, res) => {
    const readAllQuery = `SELECT e.name as event_name,agd.name as accessory_group_name,SUM(ap.price) as total_accessory_price FROM schools as s INNER JOIN events e on s.id = e.school_id INNER JOIN accessory_group_data agd on e.id = agd.event_id INNER JOIN accessory_group_product_data agpd on agd.id = agpd.group_id INNER JOIN accessory_products ap on agpd.product_id = ap.id WHERE e.active = true AND e.active = true AND s.id=${req.params.id} GROUP BY accessory_group_name, event_name, ceremony_date;`
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/school-report', {report: result});
    })
})


module.exports = router;