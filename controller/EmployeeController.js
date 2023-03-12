const Employee = require('../models/EmployeeModel');

const getAllEmployees = async(req,res,next) =>{
    try {
        const employees = await Employee.find().select('image name employmentDate dept salary phone').orFail();

        res.status(200).json({
            status : true,
            employees
        })
    } catch (error) {
        next(error)
    }
};

module.exports = { getAllEmployees }