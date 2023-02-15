const inquirer = require("inquirer");
const { findAllDepartments } = require("./db");
const db = require('./db');  //Because this folder has an index.js, this require automatically refers to the index.js file
require("console.table");



// Make a menu using inquirer prompts, and when the user selects something, it should run our DB functions
function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Make a Selection.",
                name: "selection",
                choices: ["View All Employees", "Add Employee", "Update Employee", "View Departments", "Add Department", "Find all Roles", "Add Role", "Quit application"]
            }
        ])

        //Destructuring response.selection to just be selection
        .then(({ selection }) => {
            switch (selection) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add Employee":
                    addNewEmployee();
                    break;

                case "Update Employee":
                    updateEmployee();
                    break;

                case "View Departments":
                    viewAllDepartment();
                    break;

                case "Add Department":
                    addDepartment()
                    break;

                case "Find all Roles":
                    viewAllRoles()
                    //Find all Roles function
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Quit application":
                    quit();
                    break;

            }
        })
};

function viewEmployees() {
    db.findAllEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees);
        mainMenu();
    })
}

function viewAllRoles() {
    db.findAllRoles().then(([rows]) => {
        let roles = rows;
        console.table(roles);
        mainMenu();
    })

}

function viewAllDepartment() {
    db.findAllDepartments().then(([rows]) => {
        let department = rows
        console.table(department);
        mainMenu();
    })

}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "tr_name",
                message: "Which departament would you like to choose?"
            }
        ])
        .then(res => {
            let name = res
            db.createDepartment(name)
                .then(() => console.log(`Added ${name.tr_name} to the database`))
                .then(() => mainMenu());
        })
};

function addRole() {
    // before you run the prompt to create role, you need to get the department names and ids
    db.findAllDepartments()
        .then(([rows]) => {
            // we find all departments, then we run a loop to convert the variable departmentsArr into an array
            // EXAMPLE: departmentsArr = [
            //     {
            //         name: 
            //         value:
            //     }
            // ]
            let departments = rows;
            // do like this for department and roles
            var departmentsArr = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Which role  would you like?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the role's salary"
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "What department the role belongs to",
                        choices: departmentsArr
                    }
                ])
                .then(res => {
                    let role = res;
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => mainMenu());
                })
        })
};

async function addNewEmployee() {           // you need to do find all roles function and then you also need the user to select their manager                                

    const res = await inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Whats is the employess's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "Whats is the employess's last name?"
            },
        ])
    let firstName = res.first_name;
    let lastName = res.last_name;
    const [rows] = await db.findAllRoles()
    let roles = rows;
    var rolesArr = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { roleId } = await inquirer
        .prompt([
            {
                type: "list",
                name: "roleId",
                message: "what is the employee's role",
                choices: rolesArr,
            },
        ])

    const [rows2] = await db.findAllEmployees()
    let employees = rows2;
    var employeesArr = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
    }));

    const { manager_id } = await inquirer
        .prompt([
            {
                type: "list",
                name: "manager_id",
                message: "who is the manager of this employee",
                choices: employeesArr,
            },
        ])

    console.log(roleId)
    // const manager_id = 2;  //TO DO GET ALL MANAGERS AND ORGANIZE LIKE ROLES ABOVE TO ASK QUESTION. FOR NOW WE DEFAULT ALL MANAGERS TO ID 2
    const success = await db.createEmployee(firstName, lastName, roleId, manager_id);
    mainMenu();

}





async function updateEmployee() {


    db.findAllEmployees()
        .then((employee) => {

            var employeeList = employee[0].map(employee => {
                // console.log(employee);
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            })

            console.log(employeeList);

            inquirer
                .prompt([

                    {
                        type: "list",
                        name: "employeeId",
                        message: "which employee would you like to update",
                        choices: employeeList,
                    }

                ])

                .then((res) => {
                    chosenEmployee = res;

                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            // console.table(roles);

                            inquirer
                                .prompt({
                                    type: "list",
                                    name: "roleId",
                                    message: "which employee's role do you wanna update",
                                    choices: roles.map(role => {
                                        return {
                                            name: `${role.title}`,
                                            value: role.id
                                        }
                                    })
                                })
                                .then((res) => {

                                    console.log(chosenEmployee, res);
                                    const employeeId = chosenEmployee.employeeId
                                    const roleId = res.roleId

                                    db.updateEmployee(roleId, employeeId);
                                    mainMenu()
                                });
                        });
                });
        })

}

// .then(res => {
//     let role = res;
//     db.createRole(role)
//         .then(() => console.log(`Added ${role.title} to the database`))
//         .then(() => mainMenu());
// })



// Display logo text, load main prompts
function initApp() {
    mainMenu();
}

initApp();


function quit() {
    console.log("\nGoodbye!");
    process.exit(0);
}











//You need to know this, but more often than not, you will not use it
// This is backend stuff, if you like front end then you'll probably work more with mobile apps, react
