// index: this is the first file that your computer will look at
//This is the connection to the database
const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    //Making a function called findAll Employees
    findAllEmployees() {
        // We pass our connection to database, make it a promise, and run our query
        return this.connection.promise().query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.tr_name AS department, r.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager 
        FROM employee e 
        LEFT JOIN role r ON r.id = e.role_id 
        LEFT JOIN department d ON r.department_id = d.id 
        LEFT JOIN employee m ON m.id = e.manager_id;`
        );
    };
    //findAllDepartments: name, id
    findAllDepartments() {
        //return the department name and department id
        return this.connection.promise().query(`
        SELECT d.id, d.tr_name AS department
        FROM department d;
        `);
    };

    findAllRoles() {
        // title, role id, department, salary
        return this.connection.promise().query(`
        SELECT r.title, r.id, d.tr_name AS department, r.salary
        FROM role r
        LEFT JOIN department d ON r.department_id = d.id;
        `);
    };

    createDepartment(department) {
        // write a prepared statement to add a new department
        return this.connection.promise().query(`
        INSERT INTO department (tr_name) VALUES (?); 
        `, department);
    };

    createRole(role) {
        return this.connection.promise().query(`
        INSERT INTO role SET ?;
        `, role);
    }


    //createEmployee: INSERT INTO: first_name. last_name, role_id, manager_id
    //updateEmployee: 

    createEmployee(employee) {
        return this.connection.promise().query(`
        INSERT INTO 
        `, );
    }

};

// new instance of our DB class, passing the database connection as a parameter
module.exports = new DB(connection)