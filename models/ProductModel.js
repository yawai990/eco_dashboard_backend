const mongoose = require('mongoose');
const Review = require('./ReviewModel');

const ProductSchema = mongoose.Schema({
    productName :{
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    brand : {
        type : String,
    },
    stock : {
        type : Number,
        required : true,
        default : 0
    },
    sales: {
        type : Number,
        default : 0
    },
    image : [
       { 
        path : {
        type : String,
        require : true
    }
}],
    rating:{
        type:Number
    },
    reviews : [{        
        type : mongoose.Schema.Types.ObjectId,
        ref : Review
    }]
},{
    timestamps : true
});

const Product = mongoose.model('Product', ProductSchema);
ProductSchema.index({name:"text",description:"text"},{name:"TextIndex"});

module.exports = Product;