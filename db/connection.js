// Connect MySQL to your application

//Require MySQL to make the connection
const mysql = require('mysql2');

//Creating a connection to our database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Password123?',
        // Change database name to match the one you make in schema.sql
        database: 'tr_db'
    },
    console.log(`Connected to the tr_db database.`)
);



//Exporting the variable db to use in other files (Modularizing)
module.exports = connection;