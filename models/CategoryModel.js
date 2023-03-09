const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category:{
        type : String,
        required : true
    }
},{
    timestamps : true
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;