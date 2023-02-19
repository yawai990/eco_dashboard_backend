const jwt =require('jsonwebtoken');

const verifyLoggedIn = async (req,res,next)=>{

    try {
       //check the token
    //    const token = req.cookies.access_token;
    const token =req.headers.authorization.split(' ')[1];
        
    if(!token || token === undefined) return res.status(403).send('Not Authenticate');

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).send('Unauthorized.Invalid Token')
    }
   } catch (error) {
    next(error)
   }
};

const verifyIsAdmin =async(req,res,next)=>{

    const token =req.headers.authorization.split(' ')[1];

    if(!token) res.status(401)
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
   
        if(err){ 
            res.status(403).json({
            success : false,
             message:'Your Token is expired,please login again'
            })
     }else{
        if(user.isAdmin)  next()
        else res.send('you are not admin')
     }
    })

}

module.exports =  { verifyLoggedIn,verifyIsAdmin };