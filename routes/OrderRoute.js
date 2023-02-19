const orderRouter = require('express').Router();
const { getAllOrder,updateOrder, newOrder, totalSaleQty,totalOrder } = require('../controller/OrderController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

orderRouter.use(verifyLoggedIn)
           .use(verifyIsAdmin)
           .get('/totalorders', totalOrder)
           .get('/totalsales', totalSaleQty)
           .get('/getallorders', getAllOrder)
           .post('/neworder', newOrder)
           .put('/updateorder/:id', updateOrder)


module.exports = orderRouter;