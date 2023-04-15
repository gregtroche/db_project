const PORT = 8080;
const   express = require('express'),
        app = express(),
        schools = require('./routes/schools'),
        events = require('./routes/events'),
        shipping = require('./routes/shipping'),
        bundleData = require('./routes/bundle-data');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send({ 'message':'Endpoint Working' });
});

app.use('/schools', schools);
app.use('/events', events);
app.use('/shipping', shipping);
app.use('/bundle-data', bundleData);


app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});