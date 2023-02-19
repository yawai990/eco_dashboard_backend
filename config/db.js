require('dotenv').config();

const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });

        console.log('db connected')
    } catch (error) {
       new Error('server is failed please try again later')
        
    }
    };

module.exports = connectDB;
