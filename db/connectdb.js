const mongoose = require('mongoose')
//const liveDB = 'mongodb+srv://ermadhulikasharma:1234@cluster0.tivz2go.mongodb.net/admission-portal?retryWrites=true&w=majority'

const connectDb = ()=>{
    //return mongoose.connect(process.env.LOCAL_URL)
    return mongoose.connect(process.env.LIVE_URL)
    .then(()=>{
        console.log("connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb