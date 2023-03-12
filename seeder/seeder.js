const connectDB = require('../config/db');

connectDB();
const userData = require('./user')
const User = require('../models/UserModel');
const productData = require('./Product');
const Product = require('../models/ProductModel');
const reviewData = require('./Review');
const Review = require('../models/ReviewModel');
const Order = require('../models/OrderModel');
const orderData = require('./Order');
const Category = require('../models/CategoryModel');
const categoriesData = require('./Category');
const Employee = require('../models/EmployeeModel');
const employeeData = require('./employee');

const importData = async() =>{
    try {
        await User.collection.dropIndexes();
        await Product.collection.dropIndexes();
        await Review.collection.dropIndexes();
        await Order.collection.dropIndexes();
        await Category.collection.dropIndexes();
        await Employee.collection.dropIndexes();

        await User.collection.deleteMany()
        await Product.collection.deleteMany()
        await Review.collection.deleteMany()
        await Order.collection.deleteMany()
        await Category.collection.deleteMany()
        await Employee.collection.deleteMany()

        await User.collection.insertMany(userData)
        await Product.collection.insertMany(productData)
        await Review.collection.insertMany(reviewData)
        await Order.collection.insertMany(orderData)
        await Category.collection.insertMany(categoriesData)
        await Employee.collection.insertMany(employeeData)

        console.log('data inserted successfully')
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
importData();