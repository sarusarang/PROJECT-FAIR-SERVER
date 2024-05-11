const mongoose = require('mongoose')

const ConnetionString = process.env.DATABASE

mongoose.connect(ConnetionString).then(()=>{

    console.log("MONGO DB ATLS CONNECTION SUCCESSFULL...!!");

}).catch((err)=>{

    console.log("MongoDB connection Faild");

})