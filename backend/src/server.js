import express from "express";

import { ENV } from "./lib/env.js";
import { connectDB, isDBConnected } from "./lib/db.js";
import path from "path";

const app = express();

// Middleware
app.use(express.json());

const __dirname = path.resolve();


app.get("/health", (req, res) => {
    const dbStatus = isDBConnected() ? "connected" : "disconnected";
    res.status(200).json({
        "message": "successfully running API",
        "database": dbStatus,
        "timestamp": new Date().toISOString()
    });
});


app.get("/books", (req, res) => {
    res.status(200).json({"message": "successfully running books API"});
});


if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


const startServer = async () => {
    // Start server immediately - don't wait for DB connection
    // Listen on 0.0.0.0 to accept connections from all network interfaces (required for deployment)
    app.listen(ENV.PORT, "0.0.0.0", () => {
        console.log(`🚀 Server is running on port ${ENV.PORT}`);
        console.log(`📡 Server listening on 0.0.0.0:${ENV.PORT}`);
        
        // Try to connect to DB in background (non-blocking)
        connectDB().catch((error) => {
            console.error(`⚠️  Database connection failed, but server is running: ${error.message}`);
            console.log("💡 Server will continue to run. Check your DB_URL and MongoDB connection.");
        });
    });
}

startServer();  