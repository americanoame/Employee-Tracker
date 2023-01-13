-- SELECT e.id, e.first_name, e.last_name, r.title, d.tr_name AS department, r.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager 
-- FROM employee e 
-- LEFT JOIN role r ON r.id = e.role_id 
-- LEFT JOIN department d ON r.department_id = d.id 
-- LEFT JOIN employee m ON m.id = e.manager_id;


SELECT r.title, e.id, e.role.id, d.tr_name AS department, r.salary
FROM role
INNER JOIN department ON r.department_id = d.id
