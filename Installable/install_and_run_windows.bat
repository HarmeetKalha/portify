@echo off
echo ===================================================
echo        Portify Setup and Run Script
echo ===================================================
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v18 or higher from https://nodejs.org/
    pause
    exit /b
)

echo [1/5] Installing Frontend Dependencies...
cd ..
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies.
    pause
    exit /b
)

echo.
echo [2/5] Installing Backend Dependencies...
cd backend
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies.
    pause
    exit /b
)

echo.
echo [3/5] Initializing and Seeding Database...
call npm run seed
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to seed the database.
    pause
    exit /b
)

echo.
echo [4/5] Starting Backend Server...
:: Start the backend in a separate terminal window
start "Portify Backend" cmd /c "npm run dev"

echo.
echo [5/5] Starting Frontend Server...
cd ..
:: Open the browser after a short delay to give the frontend time to start
start "Open Browser" cmd /c "timeout /t 3 >nul && start http://localhost:5173"

:: Start the frontend server in the current window
echo.
echo Starting Vite development server...
echo Keep this window and the Backend window open!
echo To stop the servers, close the windows or press Ctrl+C in each.
echo.
call npm run dev
