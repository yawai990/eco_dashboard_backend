const { getUsers,registerUser, loginUser, updateUser, deleteUser, writeReview } = require('../controller/UserController');
const { verifyLoggedIn, verifyIsAdmin } = require('../middleware/verifyLoggedIn');

const userRouter = require('express').Router();

userRouter.post('/register',registerUser)
          .post('/login',loginUser)

userRouter.use(verifyLoggedIn)
          .post('/:product_id/review', writeReview)
            .put('/update/:id',updateUser)
            .delete('/delete/:id',deleteUser)
            .get('/getusers', verifyIsAdmin, getUsers)

module.exports = userRouter;