// Connect MySQL to your application

//Require MySQL to make the connection
const mysql = require('mysql2');

//Creating a connection to our database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password123!',
        // Change database name to match the one you make in schema.sql
        database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

//Exporting the variable db to use in other files (Modularizing)
module.exports = db;