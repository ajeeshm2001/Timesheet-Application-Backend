const mongoose = require('mongoose')
const bcrypt =  require('bcrypt');
const taskSchema = require('./taskSchema');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email Address is Required"],
        unique:true
    },
    status:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    }
})

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.statics.login=async function(email,password){
    if(email===""&&password==="") throw Error ("Invalid Credentials")
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        console.log(auth);
        if(auth){
            return user;
        }
            throw Error ("Incorrect Password")
        
    }
    
        throw  Error ("Invalid Email")
}

userSchema.statics.getusers=async function(){
    console.log("hdshsdhj");
    const user = await this.find();
    console.log(user);
    return user;
}



module.exports=mongoose.model("Users",userSchema)