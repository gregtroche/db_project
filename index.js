const express = require('express');
const Schools = require('./Schools');
const database = require('./database');
const app = express();
app.set('view engine', 'ejs');


const PORT = 8080;

app.get('/', (req, res) => {
    res.send({ 'message':'Endpoint Working' });
});

app.get('/school', Schools.readAll);

app.get('/schoolnew', (req, res) => {
    const readAllQuery = 'SELECT * FROM schools';
    const data = database.query(readAllQuery);
    data.then(function(result){
        res.render('pages/schools', {schools: result})
    })
})

app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});