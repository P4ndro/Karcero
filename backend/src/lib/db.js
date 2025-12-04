import mongoose from "mongoose";
import { ENV } from "./env.js";



export const connectDB = async () => {
    if(!ENV.DB_URL){
        throw new Error("DB_URL is not set");
    }
    try {
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // 0 is success, 1 is failure
    }
}