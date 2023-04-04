const PORT = 8080;
const   express = require('express'),
        app = express(),
        schools = require('./routes/schools'),
        events = require('./routes/events');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send({ 'message':'Endpoint Working' });
});


app.use('/schools', schools);
app.use('/events', events);

app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});