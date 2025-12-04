# Karcero

A video calling interview platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Connect interviewers and candidates through seamless video conferencing with real-time communication capabilities.

## Features

- 🎥 Real-time video calling
- 💬 Interview scheduling and management
- 👥 User authentication and profiles
- 📝 Interview notes and feedback
- 🔔 Notifications and reminders

## Project Structure

```
Karcero/
├── backend/          # Express.js API server (Node.js)
├── frontend/         # React + Vite application
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

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
```
PORT=3000
DB_URL=your_mongodb_connection_string_here
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

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` (or another port if 5173 is occupied)

## API Endpoints

- `GET /health` - Health check endpoint

## Technologies Used

### MERN Stack
- **MongoDB** - NoSQL database for storing user data, interviews, and sessions
- **Express.js** - Web application framework for Node.js
- **React** - Frontend library for building user interfaces
- **Node.js** - JavaScript runtime environment

### Additional Technologies
- **Mongoose** - MongoDB object modeling for Node.js
- **Vite** - Next-generation frontend build tool
- **dotenv** - Environment variable management
- **ESLint** - Code linting and quality assurance

## Getting Started

1. Clone the repository
2. Set up the backend (see Backend Setup above)
3. Set up the frontend (see Frontend Setup above)
4. Configure your MongoDB connection string in the backend `.env` file
5. Start both servers and begin development

## License

ISC
