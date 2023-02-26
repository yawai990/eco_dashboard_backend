const { getUsers,registerUser, loginUser, updateUser, deleteUser, writeReview,getUser } = require('../controller/UserController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

const userRouter = require('express').Router();

userRouter.post('/register',registerUser)
          .post('/login',loginUser)

userRouter.use(verifyLoggedIn)
          .post('/:product_id/review', writeReview)
            .put('/update/:id',updateUser)
            .delete('/deleteuser/:id',deleteUser)
            .get('/getusers', verifyIsAdmin, getUsers)
            .get('/getuser/:id', verifyIsAdmin, getUser)

module.exports = userRouter;