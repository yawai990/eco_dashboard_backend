const User = require('../models/UserModel');
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
const hashedPassword = require('../utils/hashedPassword');
const generateToken = require('../utils/generateToken');
const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');

const getUsers = async(req,res,next)=>{
    try {
        const users = await User.find().orFail().select('-password');

        res.status(200).json({
            success : true,
            users
        })
    } catch (error) {
        next(error)
    }
};

const getUser = async(req,res,next)=>{
    try {
        const { id } = req.params;
        
        const user = await User.find({ _id:id }).select('-isAdmin').orFail();

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const registerUser = async(req,res, next) =>{

    const { name, email, password } = req.body;
   
    try {
          if(!(name || email || password) ){
            res.status(400).json({
                message : 'Please Fill all fields'
            })
        }else if(password.length < 8){
            res.status(400).json({
                message : 'Password shout have at least 8 characters '
            })
        }
        else{
                   //find the user in the database
        const userExit = await User.findOne({ email });
            if(!userExit){
                //creating the user

                //hashed Password
                const h_password = hashedPassword(password);

                //create the user register
                const createUser = await User.create({
                    name,
                    email,
                    password : h_password,
                });

                res.cookie('access_token',
                generateToken(
                    createUser._id,
                    createUser.name,
                    createUser.email,
                    createUser.isAdmin),{
                        httpOnly : true,
                        secure : process.env.NODE_ENV === 'production',
                        sameSite : 'strict',
                        maxAge : 1000 * 60 * 60 * 7
                    }
                    ).status(201).json({
                        success : true,
                        userCreated : {
                            _id : createUser._id,
                            name : createUser.name,
                            email : createUser.email,
                        }
                    })
            }else{
                res.status(409).json({
                    success : false,
                    message : 'your email address is already registered'
                })
            }
        }
    } catch (error) {
    next(error)
    }
};

const loginUser = async(req,res, next) =>{
   const { email , password } = req.body;
   try {        
        if(!(email || password )){
            res.status(400).json({
                message : 'Please Fill all fields'
            })
        }else{
            //check the email is register or not
            const user = await User.findOne({ email });

            if(user){
                //compare the password 
                const isMatch = bcrypt.compareSync(password, user.password);

                if(isMatch){
    
                    let cookieParams = {
                        httpOnly : true,
                        secure : process.env.NODE_ENV === 'production',
                        sameSite : 'strict',
                        maxAge : 1000 * 60 * 60 * 7
                    };

                    const token = generateToken(
                        user._id,
                        user.name,
                        user.email,
                        user.isAdmin
                        );

                   return res.cookie('access_token',token,cookieParams)
                   .status(200).json({
                        success : true,
                        userLoggedIn : {
                            _id : user._id,
                            name : user.name,
                            email : user.email,
                            isAdmin : user.isAdmin,
                            token
                        }
                    })
                }else{
                    return res.status(401).json({
                        success : false,
                        message : 'Wrong Credentilas'
                    })
                }
            }else{
             return  res.status(401).json({
                    success : false,
                    message : 'your email is not registered,check your email'
                })
            }
        }
   } catch (error) {
    next(error)
   }
};

const updateUser = async(req,res,next) =>{
    const { id } = req.params;
    const { name, email, new_password,address } = req.body;

    try {
        //find the user with the id
        const user = await User.findById(id).orFail();

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = hashedPassword(new_password) || user.password;
        user.address = address || '';

        user.save();

        res.status(202).json({
            success : true,
            message : 'your profile updated'
        });
    } catch (error) {
        next(error)
    }

};

const deleteUser = async(req,res,next) =>{
    const { id } = req.params;

    try {
        //find the user with the id
        const user = await User.findById(id).orFail();

         user.remove();

        res.status(202).send('User deleted');
    } catch (error) {
        next(error)
    }

};

const writeReview  = async ( req,res, next ) =>{

    const dbOperation = await Review.startSession();

    try {
        const { comment, rating } = req.body;

        if(!(comment || rating ))  res.status(400).send('Please Fill All Fields')

        const obj_id = require('mongodb').ObjectId;
        const review_id = obj_id();

        await dbOperation.startTransaction()

        await Review.create([
            {
                _id : review_id,
                comment,
                 rating : Number(rating),
                 user : {
                    //get the user id from cookie
                    _id :  req.user._id,
                    name : req.user.name
                 }
            }
        ], { dbOperation });

        //find out which product the user write a review
        const product = await Product.findById(req.params.product_id).populate('reviews').session(dbOperation);

        const alreadyReviewed = await product.reviews.find(rev => rev.user._id.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            await dbOperation.abortTransaction()
            dbOperation.endSession()
            return res.status(400).send('The product already reviewed')
        };


        await product.reviews.push(review_id);
        console.log(product)
        await product.save();
        await dbOperation.commitTransaction();
        dbOperation.endSession()

        res.status(201).send('you wrote the review')

    } catch (error) {
        await dbOperation.abortTransaction();
        dbOperation.endSession()
        next(error)
    }
}


module.exports = { getUsers,registerUser, loginUser, updateUser, deleteUser, writeReview,getUser };