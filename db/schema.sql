DROP DATABASE IF EXISTS tr_database;
CREATE DATABASE tr_database;

USE tr_database;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tr_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL INT NOT NULL, 
    department_id INT,
    FOREIGN KEY (tr_database)
  REFERENCES department(id)
  ON DELETE SET NULL
  -- optional - index on department id
     
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role_id(id)
    ON DELETE SET NULL
    FOREIGN KEY (manager_id)
    REFERENCES manager_id(id)
    ON DELETE SET NULL
    -- optional - indexes on role id, manager id
    
);

