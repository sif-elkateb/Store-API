const mongoose =require('mongoose');



const connectDB=async()=>{
    mongoose.connect(process.env.MONGO_URl);

}


module.exports=connectDB;