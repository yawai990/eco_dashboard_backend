const { getAllCategories,deleteCategory, addNewCategory } = require('../controller/CategoryController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

const CategoryRouter = require('express').Router();

CategoryRouter.get('/getallcategory', getAllCategories)
CategoryRouter.use(verifyLoggedIn)
              .use(verifyIsAdmin)
              .post('/addcategory',addNewCategory)
              .delete('/deletecategory/:id', deleteCategory)



module.exports = CategoryRouter;