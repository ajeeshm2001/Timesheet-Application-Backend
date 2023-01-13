const userSchema = require("../Models/userSchema");
const jwt =  require('jsonwebtoken')
const maxAge = 1*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},"secret",{expiresIn:maxAge})
}

const admin={
    email:"admin@gmail.com",
    password:123
}

const handleErrors = (err)=>{
    console.log(err.message);
    let errors = {email:"",password:"",message:""};
    if(err.message==="Incorrect Password"){
        errors.password="Password Incorrect"
        return errors;
    }
    if(err.code ===11000){
         errors.email="Email is Required";
         return errors;
    }
    if(err.message==="Invalid Email"){
        errors.password="Email Not Found"
        return errors;
    }
    if(err.message==="Invalid Credentials"){
        errors.message="Invalid Credentials"
        return errors;
    }
}
module.exports.register=async(req,res)=>{
    try{
        console.log(req.body);
        const {name,email,password}=req.body.details;
        const user = await userSchema.create({name,email,password})
        // const token = createToken(user._id)
        // res.cookie("usertoken",token);
        res.status(201).json({user:user._id,name:name})
    }
    catch(err){
        console.error(err);
        const errors = handleErrors(err);
        console.log(errors);
        res.json({errors,created:false})
    }
}


module.exports.login=async(req,res)=>{
    try{
        console.log(req.body);
       const {email,password}=req.body.details
       const user = await userSchema.login(email,password);
       const token = createToken(user._id)
       res.cookie("usertoken",token)
       res.status(200).json({user:user})
    }
    catch(err){
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors})

    }
}


module.exports.adminlogin = async (req,res)=>{
    try{
        const {email,password}=req.body.details;
        if(admin.email==email&&admin.password==password){
            res.status(200).json({status:true})
        }else{
            throw Error ("Invalid Credentials")
        }

    }
    catch(err){
        console.error(err);
        const errors = handleErrors(err)
        res.json({status:false,error:errors})
    }
}


module.exports.getUsers = async(req,res)=>{
    try{
        const user =await userSchema.getusers();
        res.json({users:user})
    }catch(err){

    }
}