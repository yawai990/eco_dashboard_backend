const jwt = require('jsonwebtoken');

const generateToken = ( _id,name, email, isAdmin ) =>{
    return jwt.sign({ _id,name, email, isAdmin },process.env.JWT_SECRET,{ expiresIn : '3h'})
};

module.exports = generateToken;