const Category = require('../models/CategoryModel');

const getAllCategories = async(req,res,next)=>{
    try {
        const categories =await Category.find().orFail();
        
        return   res.status(200).json({
            status : true,
            categories
        });
    } catch (error) {
        next(error)
    }
};

const deleteCategory = async(req,res,next) =>{
    try {
        const { id } = req.params;

       const category =await Category.findById(id).orFail();
    
       if(category){
        category.remove()
        category.save()
        return res.status(201).json({
            statsu : true,
            message : 'One category deleted by admin'
        })
       }else{
        return res.json({
            status : false,
            message : 'there is no category to delete'
        })
       }

       console.log(category)

       res.send('this is delete')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategories,
    deleteCategory
}