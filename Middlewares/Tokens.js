const {verify}=require('jsonwebtoken')
const dotenv= require('dotenv').config()

function verifyToken(req,res,next){
    const token= req.header('auth-token')
    if(!token){
        return res.send('cannot access')
    }
    const validate= verify(token, process.env.SECRET_TOKEN)
    req.user= validate
    next()
}

module.exports= verifyToken
