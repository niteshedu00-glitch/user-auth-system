import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    }
    catch(error){
        console.log("DB connection is failed", error.message);
        process.exit(1);
    }
};

export default connectDB;