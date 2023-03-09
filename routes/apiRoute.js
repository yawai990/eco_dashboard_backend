const userRouter = require('./UserRoute');
const productRouter = require('./ProductRoute');
const orderRouter = require('./OrderRoute');
const CategoryRouter = require('./CategoryRoute');

const apiRouter = require('express').Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/category', CategoryRouter);

module.exports = apiRouter;