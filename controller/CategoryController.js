const Category = require('../models/CategoryModel');
const Products = require('../models/ProductModel')

const getAllCategories = async(req,res,next)=>{
    try {
        const categories = await Category.find().orFail();
        const products = await Products.find().orFail();
        
        return res.status(200).json({
            status : true,
            categories,
            products
        });
    } catch (error) {
        next(error)
    }
};

const addNewCategory = async(req,res,next)=>{
    try {
       const data = req.body;
    
        Category.insertMany(data)

        res.status(201).json({
            status : true,
            message:'new categories are added'
        })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async(req,res,next) =>{

    try {
        const { id } = req.params;

       const category = await Category.findById(id).orFail();
    
       if(category){
        category.remove()
        category.save()
        return res.status(201).json({
            status : true,
            message : 'One category deleted by admin'
        })
       }else{
        return res.json({
            status : false,
            message : 'there is no category to delete'
        })
       }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addNewCategory,
    getAllCategories,
    deleteCategory
}