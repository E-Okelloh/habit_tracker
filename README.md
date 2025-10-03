# 🎯 Smart Habit Tracker

A full-stack habit tracking application with streak tracking, mood correlation, and analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

## ✨ Features

- 📊 **Track Multiple Habits** - Create and manage unlimited habits
- 🔥 **Streak Tracking** - See your consecutive completion streaks
- 😊 **Mood Correlation** - Track how habits affect your mood
- 📈 **Analytics Dashboard** - Visualize your progress with charts
- 💾 **SQLite Database** - Lightweight and portable data storage
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind-inspired styles

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.x
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker

# Install backend dependencies
cd backend
npm install
cp .env.example .env

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Server will start on http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
App will open on http://localhost:3000

## 📁 Project Structure

```
habit-tracker/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Analytics utilities
│   │   └── server.js        # Express server
│   ├── tests/               # Jest tests
│   ├── data/                # SQLite database (auto-created)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Styles
│   │   └── index.jsx        # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

The backend includes comprehensive tests for:
- ✅ Habit CRUD operations
- ✅ Entry creation and updates
- ✅ Analytics calculations
- ✅ Error handling
- ✅ Database operations

Expected coverage: > 80%

## 📦 Building for Production

### Backend Build

```bash
cd backend

# Set environment to production
export NODE_ENV=production

# Run the server
npm start
```

### Frontend Build

```bash
cd frontend

# Create optimized production build
npm run build

# The build folder will contain optimized static files
# Deploy the contents of the build folder to any static hosting
```

## 🌐 Deployment

### Deploy to Heroku

#### Backend

```bash
cd backend

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name-api

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main

# Or
