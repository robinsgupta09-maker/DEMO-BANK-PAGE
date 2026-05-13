@echo off
echo Starting HDOC Bank Application...

:: Start Backend in a new window
echo Launching Backend (FastAPI)...
start cmd /k "cd backend && python app/main.py"

:: Start Frontend in a new window
echo Launching Frontend (React)...
start cmd /k "cd frontend && npm start"

echo.
echo ==============================================
echo Servers are launching! 
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ==============================================
pause
