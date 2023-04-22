const PORT = 8080;
const   express = require('express'),
        app = express(),
        schools = require('./routes/schools'),
        events = require('./routes/events'),
        shipping = require('./routes/shipping'),
        bundleData = require('./routes/bundle-data'),
        bundleProducts = require('./routes/bundle-products'),
        accessoryGroups = require('./routes/accessory-groups'),
        accessoryProducts = require('./routes/accessory-products'),
        accessoryJoin = require('./routes/accessory-join');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send({ 'message':'Endpoint Working' });
});

app.use('/schools', schools);
app.use('/events', events);
app.use('/shipping', shipping);
app.use('/bundle-data', bundleData);
app.use('/bundle-products', bundleProducts);
app.use('/accessory-groups', accessoryGroups);
app.use('/accessory-products', accessoryProducts);
app.use('/accessory-join', accessoryJoin);


app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});