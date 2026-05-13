#!/bin/bash

echo "======================================="
echo "HDOC Bank - Quick Start Setup"
echo "======================================="
echo ""

echo "Setting up Backend..."
cd backend
pip install -r requirements.txt
echo "Backend setup complete!"
echo ""

cd ..
echo "Setting up Frontend..."
cd frontend
npm install
echo "Frontend setup complete!"
echo ""

echo "======================================="
echo "Setup Complete!"
echo "======================================="
echo ""
echo "To run the application:"
echo ""
echo "1. Terminal 1 - Backend (run from backend folder):"
echo "   python app/main.py"
echo ""
echo "2. Terminal 2 - Frontend (run from frontend folder):"
echo "   npm start"
echo ""
echo "Demo Credentials:"
echo "User: hdocuser / HDOC@123"
echo "Admin: admin / Admin@HDOC"
echo ""
echo "======================================="
