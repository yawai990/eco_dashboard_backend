const productRouter = require('express').Router();
const { getAllProducts,getSingleProduct,getBestseller, createProduct, deleteProduct, uploadImageToDB, updateSingleProdct } = require('../controller/ProductController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

productRouter.get('/allproducts', getAllProducts)
             .get('/singleproduct/:id', getSingleProduct)

productRouter.use(verifyLoggedIn)
             .use(verifyIsAdmin)
             .get('/bestsellers', getBestseller)
             .put('/updateproduct/:id',updateSingleProdct)
             .post('/createproduct', createProduct)
             .post('/createproduct/fileupload', uploadImageToDB)
             .delete('/deleteproduct/:id', deleteProduct)        
             
module.exports = productRouter;