const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const taskSchema = new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    description:{
        type:String
    },
    assigndate:{
        type:Date,
        default:Date.now
    },
    Date:{
        type:Number
    },
    Month:{
        type:Number
    },
    users:[]
})

taskSchema.statics.get=async function(id){
    const task = await this.find({users:{$elemMatch:{_id:ObjectId(id),status:"pending"}}}).sort({deadline:-1})
    return task;

}

taskSchema.statics.updateTask=async function(val,userId){
    const updatetask = await this.updateOne({_id:ObjectId(val),users:{$elemMatch:{_id:ObjectId(userId)}}},{$set:{"users.$.status":"completed","users.$.completedtime":new Date}})
    return {status:true};
}

taskSchema.statics.getCompletedTask=async function(id){
    const task = await this.aggregate(
        [  
           
            {
                $unwind:'$users'
            },
            {
                $match:{"users.status":{$all:["completed"]},"users._id":ObjectId(id)}
            }

           
        ]
    )
    return task;

}

taskSchema.statics.getDailyReport = async function(id){
    let date = new Date();
    let getDate = date.getDate()
    const report = await this.aggregate([
       {
            $match:{
                Date:getDate
            }
       },
        {
            $unwind:"$users"
        },
        {
            $match:{"users.status":"completed"}
        },{
            $group:{
                _id:"$users._id",
                count:{"$sum":1},
                name:{$addToSet:"$users.name"}
            }
        },
    ])
    return report;
}

taskSchema.statics.getMonthlyReport = async function(id){
    let date = new Date();
    let getMonth = date.getMonth()+1
    const report = await this.aggregate([
       {
            $match:{
                Month:getMonth
            }
       },
        {
            $unwind:"$users"
        },
        {
            $match:{"users.status":"completed"}
        },{
            $group:{
                _id:"$users._id",
                count:{"$sum":1},
                name:{$addToSet:"$users.name"}
            }
        },
    ])
    return report;
}



module.exports=mongoose.model("Task",taskSchema)
