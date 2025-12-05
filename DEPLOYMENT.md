# Deployment Guide for Sevalla

## Common 503 Error Causes & Solutions

### 1. **Check Deployment Logs**
Look for these in your Sevalla deployment logs:
- Server startup messages
- Port binding errors
- MongoDB connection errors
- Missing environment variables

### 2. **Environment Variables Required**
Make sure these are set in Sevalla:
```
PORT (usually auto-set by platform)
NODE_ENV=production
DB_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 3. **Build Command**
Sevalla should run:
```bash
npm run build
```

### 4. **Start Command**
Sevalla should run:
```bash
npm start
```
(Which runs `npm run start --prefix backend`)

### 5. **MongoDB Atlas IP Whitelist**
- Go to MongoDB Atlas → Network Access
- Add `0.0.0.0/0` to allow all IPs (or add Sevalla's IP ranges)
- Without this, MongoDB connection will fail

### 6. **Check Health Endpoint**
After deployment, test:
```
https://your-domain.com/health
```
Should return:
```json
{
  "message": "successfully running API",
  "database": "connected" or "disconnected",
  "timestamp": "..."
}
```

### 7. **Working Directory**
Ensure Sevalla is running commands from the **root directory** (where package.json is), not from backend/ or frontend/

### 8. **Node Version**
Make sure Sevalla is using Node.js 18+ (check in Sevalla settings)

### 9. **Build Output**
Verify that `frontend/dist` folder exists after build. If not, the build might be failing.

## Troubleshooting Steps

1. **Check logs** - Look for startup errors
2. **Test health endpoint** - `/health` should work even if DB is down
3. **Verify PORT** - Check logs show correct port
4. **Check MongoDB** - Verify connection string and IP whitelist
5. **Verify build** - Ensure frontend/dist exists
6. **Check start command** - Should be `npm start` from root

## Quick Test Locally

To test if everything works:
```bash
# Build
npm run build

# Set environment variables
export NODE_ENV=production
export PORT=3000
export DB_URL=your_mongodb_url

# Start
npm start

# Test
curl http://localhost:3000/health
```

