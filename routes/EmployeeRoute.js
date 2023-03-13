const employeeRouter = require('express').Router();
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');
const { getAllEmployees, getSingleEmployee } = require('../controller/EmployeeController');

employeeRouter.use(verifyLoggedIn)
              .use(verifyIsAdmin)
              .get('/allemployees', getAllEmployees)
              .get('/singleemployee/:id', getSingleEmployee)

module.exports = employeeRouter;