const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.use(express.static('public'))

app.all('/api/book/add', (req, res) => {
    if (req.body.bookName && req.body.authorName) {
        const sql = `INSERT INTO books values('${req.body.bookName}','${req.body.authorName}')`;
        console.log(sql);
        res.send(`ADDED SUCCESFULLY`)
    } else {
        res.send(`INVALID DATA`);
    }

});


// app.get('/', (req, res) => {
//     res.send(`HELLO WORLD`)
// })

app.listen(port)