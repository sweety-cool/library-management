const { createPool } = require('mysql');
const util = require('util');

const DB = createPool({
    host: "localhost",
    user: "root",
    password: "sweety",
    database: "librarymanagement",
    connectionLimit: 10,
    dateStrings: true
});


DB.query = util.promisify(DB.query);

module.exports = DB;