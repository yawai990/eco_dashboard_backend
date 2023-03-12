const Product = require('../models/ProductModel');
const cloudinary = require('cloudinary');


const getAllProducts = async(req,res,next)=>{

    const { pageNum } = req.query;

    const recordPerPage = 8;
    try {
        const products = await Product.find()
                                      .skip(recordPerPage * (Number(pageNum) - 1))
                                      .limit(recordPerPage);

        const totalProduct = await Product.countDocuments();

        res.json({
            products,
             pageNum, 
             pagination : Math.ceil(totalProduct/ recordPerPage)
            });
    } catch (error) {
        next(error)
    }
};

const getSingleProduct = async(req,res, next)=>{
    const { id } = req.params;

    try {
        const product = await Product.findById(id).orFail();

        res.status(200).json({ status:true,product})
    } catch (error) {
        next(error)
    }
};

const updateSingleProdct = async(req,res,next) =>{
    try {
        const { id } = req.params;

        const { productName,  productPrice, category, productBrand, productStock } = req.body;

        const product = await Product.findById(id).orFail();

        product.productName = productName || product.productName;
        product.price = productPrice || product.price;
        product.category = category || product.category;
        product.brand = productBrand || product.brand;
        product.stock = productStock || product.stock;

        await product.save()

        return res.status(202).json({
            status : true,
            message : 'product updated'
        })
    } catch (error) {
        next(error)
    }
}

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const createProduct = async (req,res,next) =>{
        const { productName, productPrice, productBrand, productCategory, productStock, img } = req.body;

    try {

        if(!(productName || productPrice || productBrand || productCategory ||  productStock || img )) {
            return res.status(400).json({
                success : false,
                message : 'Please Fill all fields'
            })
        }else{
            //inserting the new Product
            const newProduct = {
                productName,
                price : productPrice,
                brand :productBrand,
                category:productCategory,
                stock : productStock,
                image :[
                    {
                        path : img
                    }
                ]
            };

            const product = await Product.create(newProduct);
           
            product.save();

            res.status(201).json({ success : true, produtData : product._id })
        }
    } catch (error) {
        next(error)
    }
};

const deleteProduct = async(req,res,next)=>{
    
    try {
        //get the id
        const { id } = req.params;

        //find the product from the db
        const product = await Product.findById(id).orFail();

        if(!product){
           return res.status(401).send('there is not product')
        };

        product.remove();
        return res.status(202).send('one product deleted')
    } catch (error) {
        next(error)
    }
};

const uploadImageToDB = async(req,res,next)=>{

    try {
        const { images, productID } = req.body;

        if(!(images || productID)){
            throw new Error('please provide an image')
        }else{
           const product =await Product.findById(productID).orFail();;

           if(!product){
            return res.status(400).send('you can not upload an image')
           }else{
         
            product.image.push({ 
                path :`https://res.cloudinary.com/dtcws1ecu/image/upload/v1675503460/ecommerV2/${images}`
            });
            product.save()

            res.send('image uploaded')
           }
        }
    } catch (error) {
    next(error)        
    }
}

const getBestseller = async(req,res,next)=>{
    try {   
        const products = await Product.aggregate([
            { $sort : { sales : -1}},
            { $group : { _id : "$sales",doc_with_max_sales : { $first: "$$ROOT" } } },
            { $replaceWith: '$doc_with_max_sales' }, //replace the doc_with_max_sales will be replace with bestsellers if we are not the resp will be with doc_with_max_sales
            { $match : { sales : { $gt : 1}}},
            { $project : { image : 1, productName : 1, category : 1, brand : 1, price :1, stock :1 }},
            { $limit : 2}
        ]);
            res.status(200).json({
                status : true,
                bestseller : products
            })
        
        } catch (error) {
        next(error)
    }
}


module.exports = { getAllProducts,getSingleProduct, createProduct, deleteProduct,uploadImageToDB, updateSingleProdct, getBestseller };