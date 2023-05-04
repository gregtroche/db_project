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
    if(req.body.buttonReport === 'Accessory Pricing') {
        res.redirect(`accessory-report/${req.body.schoolId}`);
    } else if (req.body.buttonReport === 'Days to Graduation') {
        res.redirect(`important-dates/${req.body.schoolId}`);
    }
})

router.get('/accessory-report/:id', (req, res) => {
    const readAllQuery = `SELECT s.name as school_name, e.name as event_name,agd.name as accessory_group_name,SUM(ap.price) as total_accessory_price FROM schools as s INNER JOIN events e on s.id = e.school_id INNER JOIN accessory_group_data agd on e.id = agd.event_id INNER JOIN accessory_group_product_data agpd on agd.id = agpd.group_id INNER JOIN accessory_products ap on agpd.product_id = ap.id WHERE e.active = true AND e.active = true AND s.id=${req.params.id} GROUP BY accessory_group_name, event_name, ceremony_date, school_name;`
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/school-report', {report: result});
    })
})

router.get('/important-dates/:id', (req, res) => {
    const readAllQuery = `SELECT s.name as school_name, e.name as event_name, website_close_date, days_until(website_close_date) as website_close_time, ceremony_date, days_until(ceremony_date) as days_until_ceremony from events as e inner join schools s on e.school_id = s.id where school_id = ${req.params.id} order by days_until_ceremony;`
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('../views/pages/ceremony-report', {report: result});
    })
})


module.exports = router;