const express = require('express');
const cors = require('cors')
const app = express();
const authRoutes = require('./Routes/authRouter')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')

app.listen(5000,()=>{
    console.log("Server Connected to 5000 Port");
})


mongoose.connect('mongodb://0.0.0.0:27017/timesheetapplication').then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(err.message);
})

app.use(
    cors({
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
        credentials:true
    })
)


app.use(cookieparser())
app.use(express.json());
app.use('/',authRoutes)
