const employeeRouter = require('express').Router();
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');
const { getAllEmployees } = require('../controller/EmployeeController');

employeeRouter.use(verifyLoggedIn)
              .use(verifyIsAdmin)
              .get('/allemployees', getAllEmployees)

module.exports = employeeRouter;