const employeeRouter = require('express').Router();
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');
const { getAllEmployees, getSingleEmployee,addNewEmployee } = require('../controller/EmployeeController');

employeeRouter.use(verifyLoggedIn)
              .use(verifyIsAdmin)
              .get('/allemployees', getAllEmployees)
              .get('/singleemployee/:id', getSingleEmployee)
              .post('/addnewemployee',addNewEmployee)

module.exports = employeeRouter;