# HDOC Bank - Getting Started Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Setup Backend

```bash
cd "bank website\backend"
pip install -r requirements.txt
python app/main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Setup Frontend (New Terminal)

```bash
cd "bank website\frontend"
npm install
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view hdoc-bank in the browser.
```

### Step 3: Access the Application

1. Open browser and go to `http://localhost:3000`
2. Click "Net Banking"
3. Use demo credentials:
   - **User ID**: `hdocuser`
   - **Password**: `HDOC@123`

## 📋 Features to Test

### Landing Page (http://localhost:3000)
- ✅ Hero section with animations
- ✅ Feature showcase cards
- ✅ Security section
- ✅ Testimonials
- ✅ Navigation menu
- ✅ Call-to-action buttons

### Login Page (http://localhost:3000/login)
- ✅ Login form with validation
- ✅ Demo credentials
- ✅ Error messages
- ✅ Remember me checkbox
- ✅ Password show/hide toggle

### User Dashboard (http://localhost:3000/dashboard)
- ✅ Welcome message with user name
- ✅ Account balance with hide/show
- ✅ Account details (Number, IFSC, Branch)
- ✅ Quick action buttons
- ✅ Recent transactions list
- ✅ Credit/Debit cards display
- ✅ Monthly spending chart
- ✅ Income vs Expenses chart
- ✅ Spending by category chart
- ✅ Security alerts
- ✅ Sidebar navigation
- ✅ Dark mode support

### Admin Panel (http://localhost:3000/admin)
1. Go to http://localhost:3000/admin-login
2. Use credentials:
   - **Admin ID**: `admin`
   - **Password**: `Admin@HDOC`
3. Features:
   - ✅ User management table
   - ✅ Search users
   - ✅ Edit user balance
   - ✅ Update user status (Freeze/Unfreeze)
   - ✅ Delete users
   - ✅ Analytics dashboard
   - ✅ Transaction graphs
   - ✅ User growth charts

## 🔧 Troubleshooting

### Problem: "Address already in use" (Port 8000 or 3000)

**Solution 1**: Kill existing process
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution 2**: Use different ports
```bash
# Backend (different port)
python app/main.py --port 8001

# Frontend (different port)
PORT=3001 npm start
```

### Problem: Backend errors or 500 responses

**Solution**:
1. Check if `data/users.json` exists
2. Verify Python version: `python --version` (should be 3.8+)
3. Check error logs in terminal
4. Restart backend server

### Problem: Frontend won't connect to backend

**Solution**:
1. Verify backend is running on port 8000
2. Check browser console (F12) for errors
3. Verify API URL in `frontend/.env`
4. Clear browser cache and reload

### Problem: "Module not found" errors

**Solution**:
```bash
# Frontend
cd frontend
npm install --legacy-peer-deps

# Backend
cd backend
pip install --upgrade -r requirements.txt
```

## 📊 API Testing

### Using Swagger UI
1. Go to `http://localhost:8000/docs`
2. Try different endpoints
3. Test authentication

### Example API Calls

**Login User:**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"hdocuser\",\"password\":\"HDOC@123\"}"
```

**Get Admin Users:**
```bash
curl "http://localhost:8000/api/admin/users"
```

**Update User Balance:**
```bash
curl -X POST "http://localhost:8000/api/admin/update-balance" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"hdocuser\",\"balance\":500000}"
```

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#0066ff',  // Change this
  secondary: '#1a1f3a',
  accent: '#00d4ff',
}
```

### Add New Users
Edit `backend/data/users.json`:
```json
{
  "id": 4,
  "user_id": "newuser",
  "name": "New User",
  "password": "Password@123",
  ...
}
```

### Change API Port
Edit `backend/app/main.py`:
```python
if __name__ == "__main__":
    init_databases()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Change port here
```

## 📱 Responsive Testing

### Desktop (1920x1080)
- All features visible
- Full sidebar navigation
- Grid layouts

### Tablet (768x1024)
- Sidebar collapses
- Touch-friendly buttons
- Adjusted spacing

### Mobile (375x667)
- Bottom navigation
- Full-width cards
- Stacked layout

## 🔐 Security Notes

- Demo uses simple JSON storage (use database for production)
- Passwords are stored as plaintext (use hashing in production)
- CORS is open to all origins (restrict in production)
- JWT tokens don't expire in demo (set expiration in production)

## 📈 Performance Tips

1. **Optimize images**: Use WebP format
2. **Enable caching**: Add cache headers
3. **Minify CSS/JS**: `npm run build`
4. **Use CDN**: For static assets
5. **Database indexing**: For faster queries
6. **API pagination**: Limit data in responses

## 🚢 Deployment Checklist

- [ ] Remove demo data
- [ ] Set up production database
- [ ] Enable authentication
- [ ] Configure CORS properly
- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Add error logging
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Test all features

## 📞 Common Commands

```bash
# Backend
python app/main.py              # Start server
pip list                         # List packages
pip install -r requirements.txt # Install deps

# Frontend
npm start                        # Start dev server
npm build                        # Create build
npm test                         # Run tests
npm install <package>           # Install package
npm uninstall <package>         # Remove package
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [FastAPI Tutorial](https://fastapi.tiangolo.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)

## 🎯 Next Steps

1. ✅ Get application running
2. ✅ Test all features
3. ✅ Customize branding
4. ✅ Add production database
5. ✅ Deploy to hosting service

## 💡 Tips

- Use F12 to open developer tools
- Check console for errors
- Test on different browsers
- Use mobile device emulation
- Monitor network requests
- Profile performance

---

**Happy Banking! 🏦**
