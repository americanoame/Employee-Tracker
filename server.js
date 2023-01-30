const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2')

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Password123?',
    database: 'tr_db'
  },
  console.log(`Connected to the tr_db database.`)
);

// Query database
db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});

// user is prompted with the available functionalities (view all employees, update employee, etc)

// user selects one of them

// user completes that functionality

// repeat loop