const PORT = 8080;
const   express = require('express'),
        app = express(),
        schools = require('./routes/schools'),
        events = require('./routes/events'),
        shipping = require('./routes/shipping'),
        bundleData = require('./routes/bundle-data'),
        bundleProducts = require('./routes/bundle-products'),
        bundleJoin = require('./routes/bundle-join'),
        accessoryGroups = require('./routes/accessory-groups'),
        accessoryProducts = require('./routes/accessory-products'),
        accessoryJoin = require('./routes/accessory-join'),
        home = require('./routes/home'),
        reports = require('./routes/reports'),
        views = require('./routes/views');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/schools/', schools);
app.use('/events/', events);
app.use('/shipping/', shipping);
app.use('/bundle-data/', bundleData);
app.use('/bundle-products/', bundleProducts);
app.use('/accessory-groups/', accessoryGroups);
app.use('/accessory-products/', accessoryProducts);
app.use('/accessory-join/', accessoryJoin);
app.use('/bundle-join/', bundleJoin);
app.use('/views/', views);
app.use('/reports/', reports);
app.use('/', home);

app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});