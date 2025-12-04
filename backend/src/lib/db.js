import mongoose from "mongoose";
import { ENV } from "./env.js";



export const connectDB = async () => {
    if(!ENV.DB_URL){
        console.warn("⚠️  DB_URL is not set - MongoDB connection skipped");
        return;
    }
    try {
        const conn = await mongoose.connect(ENV.DB_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        // Don't exit - let server start anyway
        // The server can still respond to requests even if DB is down
        throw error;
    }
}

export const isDBConnected = () => {
    return mongoose.connection.readyState === 1;
}