const taskSchema = require("../Models/taskSchema");
const userSchema = require("../Models/userSchema");
const jwt = require('jsonwebtoken')


module.exports.taskAssign = async(req,res)=>{
    try{
        let date = new Date();
        let getDate = date.getDate();
        let getMonth = date.getMonth()+1;
        const {task,deadline,description}=req.body.details
        const users = await userSchema.find();
        users.forEach((element)=>{
            element.status="pending"
        })
        console.log(users);
        const assignedtask = await taskSchema.create({taskname:task,deadline,users,Date:getDate,Month:getMonth,description});
        console.log(assignedtask);
        res.json({status:true})

    }
    catch(err){
        console.error(err);
    }
}

module.exports.getTask = async(req,res)=>{
    try{
        console.log(req.body);
        jwt.verify(req.body.cookie,"secret",async(err,decodedId)=>{
            const task = await taskSchema.get(decodedId.id)
            res.json({task:task,user:decodedId.id})
        })

    }catch(err){
        console.error(err);
    }
}

module.exports.updateTask=async(req,res)=>{
    try{
        const {val,userId}=req.body
        const update = await taskSchema.updateTask(val,userId)
        if(update.status){
            res.json({status:true})
        }
        

    }catch(err){
        console.error(err);
    }
}

module.exports.completedTask = async(req,res)=>{
    try{
        jwt.verify(req.body.cookie,"secret",async(err,decodedId)=>{
            const task = await taskSchema.getCompletedTask(decodedId.id)
            res.json({task:task,user:decodedId.id})
        })

    }catch(err){
        console.error(err);
    }
}


module.exports.getDailyReport = async(req,res)=>{
    try{
        
        const dailyreport = await taskSchema.getDailyReport();
        res.json({report:dailyreport}) 
    }catch(err){
        console.error(err);
    }
}

module.exports.getMonthlyReport = async(req,res)=>{
    try{
        const Monthlyreport = await taskSchema.getMonthlyReport();
        res.json({report:Monthlyreport}) 
    }catch(err){
        console.error(err);
    }
}