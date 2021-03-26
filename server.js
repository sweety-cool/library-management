const express = require('express');
const DB = require('./database');
const app = express();
const port = 5000;

app.use(express.json());

app.use(express.static('public'))

// BOOK ################################
app.all('/api/book/add', async (req, res) => {

    if (req.body.bookName && req.body.authorName) {

        const sql = `INSERT INTO book (book_name, author_name)
                      VALUES ('${req.body.bookName}', '${req.body.authorName}')`;
        await DB.query(sql);
        res.send(`ADDED SUCCESFULLY`);

    } else res.send(`INVALID DATA`);

});

app.all('/api/book/list', async (req, res) => {
    let data = await DB.query(`SELECT * FROM book`);
    res.json(data);
})


// STUDENT ################################
app.all('/api/student/add', async (req, res) => {

    if (req.body.studentName) {
        await DB.query(`INSERT INTO book (student_name) VALUES ('${req.body.studentName}')`);
        res.send(`ADDED SUCCESFULLY`);
    } else res.send(`INVALID DATA`);

});

app.all('/api/student/list', async (req, res) => {
    res.json(await DB.query(`SELECT * FROM student`));
});


// BORROW ################################
app.all('/api/borrow/list', async (req, res) => {
    let data = await DB.query(`SELECT * FROM borrow,student,book WHERE student.student_id = borrow.student_id AND book.book_id=borrow.book_id ORDER BY issue_date;`);
    res.json(data);
});

app.all('/api/borrow/add', async (req, res) => {

    if (req.body.studentId && req.body.bookId) {

        // Get Today and Add 7 days in returnDay
        let today = new Date(), returnDay = new Date();
        returnDay.setDate(today.getDate() + 7);

        // Format dates YYYY-MM-DD
        today = today.toISOString().substr(0, 10);
        returnDay = returnDay.toISOString().substr(0, 10);

        // Prepare SQL
        const sql = `INSERT INTO borrow VALUES ('${req.body.bookId}', '${req.body.studentId}', '${returnDay}', '${today}');`

        // RUN SQL
        await DB.query(sql);

        // SEND FEEDBACK / SUCCESS MESSAGE
        res.send(`ADDED SUCCESFULLY`);

    } else {
        res.send(`INVALID DATA`);
    }

});



app.listen(port)