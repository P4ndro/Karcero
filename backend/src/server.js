import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { serve } from "inngest/express";
import { ENV } from "./lib/env.js";
import { connectDB, isDBConnected } from "./lib/db.js";
import path from "path";
import cors from "cors";
// Log environment info at startup
console.log("=".repeat(50));
console.log("🚀 Starting Karcero Server...");
console.log(`📦 NODE_ENV: ${ENV.NODE_ENV}`);
console.log(`🔌 PORT: ${ENV.PORT}`);
console.log(`🗄️  DB_URL: ${ENV.DB_URL ? "✅ Set" : "❌ Not set"}`);
console.log("=".repeat(50));

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use("/api/inngest", serve({client : inngest, functions}));


app.use((err, req, res, next) => {
    console.error("❌ Express Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

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
    // __dirname is backend/src/, so go up two levels to reach root, then into frontend/dist
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    const absoluteFrontendPath = path.resolve(frontendPath);
    console.log(`📁 Serving frontend from: ${absoluteFrontendPath}`);
    console.log(`📁 Current working directory: ${process.cwd()}`);
    app.use(express.static(absoluteFrontendPath));
    // Express 5 doesn't support "*" route - use catch-all middleware instead
    // This will only catch routes that weren't handled by API routes or static files
    app.use((req, res) => {
        res.sendFile(path.join(absoluteFrontendPath, "index.html"));
    });
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("❌ Uncaught Exception:", error);
    // Don't exit - keep server running
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    // Don't exit - keep server running
});

const startServer = async () => {
    try {
        // Validate PORT is set
        if (!ENV.PORT) {
            console.error("❌ PORT environment variable is not set!");
            process.exit(1);
        }

        // Start server immediately - don't wait for DB connection
        // Listen on 0.0.0.0 to accept connections from all network interfaces (required for deployment)
        const server = app.listen(ENV.PORT, "0.0.0.0", () => {
            console.log("=".repeat(50));
            console.log(`✅ Server is running on port ${ENV.PORT}`);
            console.log(`📡 Server listening on 0.0.0.0:${ENV.PORT}`);
            console.log(`🌐 Health check: http://0.0.0.0:${ENV.PORT}/health`);
            console.log("=".repeat(50));
            
            // Try to connect to DB in background (non-blocking)
            connectDB().catch((error) => {
                console.error(`⚠️  Database connection failed, but server is running: ${error.message}`);
                console.log("💡 Server will continue to run. Check your DB_URL and MongoDB connection.");
            });
        });

        // Handle server errors
        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`❌ Port ${ENV.PORT} is already in use`);
            } else {
                console.error("❌ Server error:", error);
            }
            process.exit(1);
        });

    } catch (error) {
        console.error(`❌ Error starting server: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
}

startServer();  