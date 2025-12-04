# Karcero

A video calling interview platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Connect interviewers and candidates through seamless video conferencing with real-time communication capabilities.

## Features

- 🎥 Real-time video calling powered by Stream
- 🔐 User authentication with Clerk
- 💬 Interview scheduling and management
- 📝 Interview notes and feedback
- 🔔 Automated notifications and reminders via Inngest
- 🗄️ MongoDB database for data persistence

## Project Structure

```
Karcero/
├── backend/          # Express.js API server (Node.js)
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── lib/          # Utilities (env, db)
│   └── server.js         # Entry point
├── frontend/         # React + Vite application
│   └── src/          # React components and pages
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)
- Clerk account ([sign up here](https://clerk.com))
- Stream account ([sign up here](https://getstream.io))
- Inngest account ([sign up here](https://www.inngest.com))

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
DB_URL=your_mongodb_connection_string_here
NODE_ENV=development

# Inngest Configuration
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Stream Configuration
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Clerk Configuration (for backend verification)
CLERK_SECRET_KEY=your_clerk_secret_key
```

5. Start the development server:
```bash
npm run dev
```

The backend API will be running on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` (or another port if 5173 is occupied)

## Database Setup

The application uses MongoDB with Mongoose for data modeling. The database connection is automatically established when the server starts.

### MongoDB Connection

- Ensure MongoDB is running locally or use MongoDB Atlas for cloud hosting
- Update `DB_URL` in your backend `.env` file with your connection string
- **Example formats:**
  - Local: `mongodb://localhost:27017/karcero`
  - Atlas: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`
- **⚠️ Never commit your actual connection string with real credentials to the repository**

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /books` - Books API endpoint (example)

## Technologies Used

### MERN Stack
- **MongoDB** - NoSQL database for storing user data, interviews, and sessions
- **Express.js** - Web application framework for Node.js
- **React** - Frontend library for building user interfaces
- **Node.js** - JavaScript runtime environment

### Core Technologies
- **Mongoose** - MongoDB object modeling for Node.js
- **Vite** - Next-generation frontend build tool
- **dotenv** - Environment variable management
- **ESLint** - Code linting and quality assurance

### Third-Party Services
- **Clerk** - Authentication and user management
  - Handles user sign-in, sign-up, and session management
  - Provides secure authentication flows
- **Stream** - Video calling and real-time communication
  - Powers the video interview functionality
  - Enables seamless video conferencing between interviewers and candidates
- **Inngest** - Background jobs and workflow automation
  - Handles scheduled tasks and notifications
  - Manages interview reminders and follow-up workflows

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/P4ndro/Karcero.git
cd Karcero
```

2. Set up your accounts:
   - Create a [Clerk account](https://clerk.com) and get your API keys
   - Create a [Stream account](https://getstream.io) for video capabilities
   - Create an [Inngest account](https://www.inngest.com) for background jobs
   - Set up MongoDB (local or MongoDB Atlas)

3. Configure environment variables:
   - Set up backend `.env` file (see Backend Setup)
   - Set up frontend `.env` file (see Frontend Setup)

4. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Development

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`
- MongoDB connection is established automatically on server start
- Hot reload is enabled for both frontend and backend during development

## License

ISC
