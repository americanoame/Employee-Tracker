//Because this folder has an index.js, this require automatically refers to the index.js file
const db = require('./db');

// get console.table package
// get inquirer package

// Make a menu using inquirer prompts, and when the user selects something, it should run our DB functions

function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Make a Selection.',
                name: 'selection',
                choices: ['Find All Employees', 'Find all Roles', 'Find all Departments', 'Add Employee']
            }
        ])
        //Destructuring response.selection to just be selection
        .then(({ selection }) => {
            switch (selection) {
                case 'Find All Employees':
                    viewEmployees();
                    break;
                case 'Find all Roles':
                    //Find all Roles function
                    break;
                case 'Find all Departments':
                    // Find all Departments fucntion
                    break;
            }
        })
};

function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => mainMenu());
}

//You need to know this, but more often than not, you will not use it
// This is backend stuff, if you like front end then you'll probably work more with mobile apps, react