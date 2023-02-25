const mongoose = require('mongoose');
const User = require('./UserModel');
const Product = require('./ProductModel');

const OrderSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : User
    },
    product : {
        type :  mongoose.Schema.Types.ObjectId,
        required: true,
        ref : Product
    },
    orderDate : {
        type : String,
        required : true,
    },
    payment : {
        type : Number,
        required : true
    },
    orderQuantity : {
        type : Number,
        default : 1
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
    },
    paidAt : {
        type : Date,
        required: true,
        default : new Date()
    },
    totalSales :{
        type:Number,
        default : 0
    },
    isDeliver : {
        type : Boolean,
        default : false
    },
    deliveredAt : {
        type :Date
    }
},{
    timestamps : true
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;