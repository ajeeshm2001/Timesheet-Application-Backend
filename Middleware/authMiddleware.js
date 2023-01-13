const User = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


module.exports.checkUser = async(req,res,next)=>{
    const token = req.cookies.usertoken
    if(token){
        jwt.verify(token,"secret",async(err,decodedId)=>{
            if(err){
                res.json({status:false})
                next()
            }else{
                const user = await User.findById(decodedId.id)
                if(user){
                    res.json({status:true,user:user})
                }else{
                    res.json({status:false})
                    next()
                }
            }
        })

    }else{
        res.json({status:false})
        next()
    }
}