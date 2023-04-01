const express = require('express');
const Schools = require('./Schools');
const database = require('./database');
// const db = require('pg');
// const dbConnection = 'postgres://postgres:postgres@127.0.0.1:5432/postgres';
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

// This route works but it's not as good
// app.get('/schoolnewnew', (req, res) => {
//     const dbClient = new db.Client(dbConnection);
//     dbClient.connect((err) => {
//         if(err)
//             throw err;
//         const query = 'SELECT * FROM schools';
//         dbClient.query(query, (err, result) => {
//             if(err)
//                 throw err;
//             else {
//                 res.render('pages/schools', {schools: result});
//                 res.end;
//             }
//         })
//     }) 
// })

app.listen(PORT, () => {
    console.log(`Server Running at: http://localhost:${PORT}/`);
});