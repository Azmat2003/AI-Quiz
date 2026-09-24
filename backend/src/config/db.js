import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
