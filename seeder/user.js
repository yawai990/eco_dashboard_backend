const bcrypt = require('bcryptjs');
const objectId =require('mongodb').ObjectId;

const Users = [
    {
        _id : objectId(),
        name:'admin',
        email:'admin@admin.com',
        password:bcrypt.hashSync('admin@admin.com',10),
        isAdmin:true
    },
    {
        _id : objectId("637381ef9483630d4d9dbf15"),
        name:'Jhon Doe',
        email:'jhon@doe.com',
        password:bcrypt.hashSync('jhon@doe.com',10),
        isAdmin:false
    },
];

module.exports = Users;