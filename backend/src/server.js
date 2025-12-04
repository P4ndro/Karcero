import express from "express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import path from "path";

const app = express();

// Middleware
app.use(express.json());

const __dirname = path.resolve();


app.get("/health", (req, res) => {
    res.status(200).json({"message": "successfully running API"});
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
    try {
        await connectDB();
        // Listen on 0.0.0.0 to accept connections from all network interfaces (required for deployment)
        app.listen(ENV.PORT, "0.0.0.0", () => {
            console.log(`🚀 Server is running on port ${ENV.PORT}`);
        });
    } catch (error) {
        console.error(`❌ Error starting server: ${error.message}`);
        process.exit(1); // 0 is success, 1 is failure
    }
}

startServer();  