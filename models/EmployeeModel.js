const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    employementDate : {
        type : String,
        required : true
    },
    dept : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    rank : {type : String,required : true},
    HRCode : {type: String,required : true,unique : true},
    birthDate : {type : String,required : true},
    nationality : { type : String },
    gender : { type : String },
    state : {type :String},
    city : {type:String},
    email :{type:String,required : true, unique:true },
    address : {type :String, required:true}
});

const EmployeeModel = mongoose.model('employee',EmployeeSchema);

module.exports = EmployeeModel;