import dotenv from "dotenv";


dotenv.config({quiet: true});

// Debug: Log all environment variables that start with INNGEST
if (process.env.NODE_ENV === "production") {
    console.log("🔍 All INNGEST-related env vars:");
    Object.keys(process.env).filter(key => key.includes("INNGEST")).forEach(key => {
        const value = process.env[key];
        console.log(`  ${key}: ${value ? `Set (${value.length} chars, starts with: ${value.substring(0, 10)}...)` : "Not set"}`);
    });
}

// Try to get signing key with multiple methods to catch any issues
const getSigningKey = () => {
    // Try correct name first
    let key = process.env.INNGEST_SIGNING_KEY;
    if (key) return key.trim();
    
    // Try common typo: INNGEST_SIGNIN_KEY (missing G)
    key = process.env.INNGEST_SIGNIN_KEY;
    if (key) {
        console.warn("⚠️  Found INNGEST_SIGNIN_KEY (typo - missing 'G'). Please rename to INNGEST_SIGNING_KEY in Sevalla!");
        return key.trim();
    }
    
    // Try with bracket notation (in case of special chars)
    key = process.env["INNGEST_SIGNING_KEY"];
    if (key) return key.trim();
    
    // Try all env vars and find any that might be it (case-insensitive, includes common typos)
    const envKeys = Object.keys(process.env);
    const signingKeyVar = envKeys.find(k => 
        (k.toLowerCase().includes("signin") || k.toLowerCase().includes("signing")) && 
        k.toLowerCase().includes("inngest")
    );
    if (signingKeyVar && signingKeyVar !== "INNGEST_SIGNING_KEY") {
        console.warn(`⚠️  Found potential signing key with different name: ${signingKeyVar}`);
        console.warn(`⚠️  Please rename it to INNGEST_SIGNING_KEY in Sevalla for consistency!`);
        return process.env[signingKeyVar]?.trim();
    }
    
    return null;
};

export const ENV = {
    PORT: process.env.PORT || 3000,
   
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.CLIENT_URL, 
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: getSigningKey(),
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
}

// Log if PORT is not set (for debugging)
if (!process.env.PORT) {
    console.warn("⚠️  PORT not set in environment, using default: 3000");
}