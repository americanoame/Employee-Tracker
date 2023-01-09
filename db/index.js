// index: this is the first file that your computer will look at

//This is the connection to the database
const db = require('./connection');

// Make your queries in js

class DBFunctions {
    constructor(connection) {
        this.connection = connection;
    }
    //Making a function called findAll Employees
    findAllEmployees() {
        // We pass our connection to database, make it a promise, and run our query
        return this.connection.promise().query(
            `SELECT * FROM employee`
        );
    };

    //findAllDepartments
    //findAllRoles
    //createRoles
    //createDepartment
};

// new instance of our DB class, passing the database connection as a parameter
module.export = new DBFunctions(db)