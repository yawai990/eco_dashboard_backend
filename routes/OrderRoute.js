const orderRouter = require('express').Router();
const { getAllOrder,getSingleOrder,updateOrder, newOrder, totalSaleQty,totalOrder,makeDeliver, Years } = require('../controller/OrderController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

orderRouter.use(verifyLoggedIn)
           .use(verifyIsAdmin)
           .get('/totalorders', totalOrder)
           .get('/years', Years)
           .get('/totalsales', totalSaleQty)
           .get('/getallorders', getAllOrder)
           .get('/getsingleorder/:id',getSingleOrder)
           .post('/neworder', newOrder)
           .put('/updateorder/:id', updateOrder)
           .put('/makedeliver/:id', makeDeliver)


module.exports = orderRouter;