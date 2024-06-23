require('dotenv').config();
const mongoose=require('mongoose');
let URI=process.env.DATABASE_KEY;

const connectDatabase=async()=>{
    try{
    await mongoose.connect(URI);
    console.log("database connection estabilished");
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}

module.exports={connectDatabase};