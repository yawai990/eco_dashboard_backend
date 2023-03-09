const { getAllCategories,deleteCategory } = require('../controller/CategoryController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

const CategoryRouter = require('express').Router();

CategoryRouter.get('/getallcategory', getAllCategories)
CategoryRouter.use(verifyLoggedIn)
              .use(verifyIsAdmin)
              .delete('/deletecategory/:id', deleteCategory)



module.exports = CategoryRouter;