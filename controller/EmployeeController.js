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

const getSingleEmployee = async (req,res,next)=>{
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id).orFail();
      
        res.status(200).json({
            status : true,
            employee
        })
    } catch (error) {
        next(error)
    }
};

const addNewEmployee = async(req,res,next)=>{
    try {
        const { image, name, employementDate, dept, salary, rank, phone, HRCode, birthDate, nationality,gender , state,city ,email,address  } = req.body;

        const newEmployee = {
            image,name, employementDate,dept,salary,phone,rank,HRCode,birthDate,nationality,gender,state,city,email,address
        };

        const emp = await Employee.create(newEmployee);

        emp.save();

        res.status(201).json({
            status : true,
            message : 'new staff addeds'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllEmployees, getSingleEmployee, addNewEmployee }