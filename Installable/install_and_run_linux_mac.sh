#!/bin/bash

echo "==================================================="
echo "           Portify Setup and Run Script            "
echo "==================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed. Please install Node.js v18 or higher from https://nodejs.org/"
    exit 1
fi

# Navigate to the project root (assuming script is in Installable folder)
cd ..

echo "[1/5] Installing Frontend Dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install frontend dependencies."
    exit 1
fi

echo ""
echo "[2/5] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install backend dependencies."
    exit 1
fi

echo ""
echo "[3/5] Initializing and Seeding Database..."
npm run seed
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to seed the database."
    exit 1
fi

echo ""
echo "[4/5] Starting Backend Server..."
# Start backend in the background
npm run dev &
BACKEND_PID=$!

echo ""
echo "[5/5] Starting Frontend Server..."
cd ..

# Function to open browser based on OS
open_browser() {
    sleep 3
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    elif command -v open &> /dev/null; then
        open http://localhost:5173
    else
        echo "Please manually open http://localhost:5173 in your browser."
    fi
}

# Open browser in the background
open_browser &

# Start frontend in the foreground
echo ""
echo "Starting Vite development server..."
echo "Press Ctrl+C to stop both servers."
echo ""

# Catch Ctrl+C to kill both frontend and backend
trap "kill $BACKEND_PID; exit" INT

npm run dev
