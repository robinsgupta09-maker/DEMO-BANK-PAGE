# ⚡ HDOC Bank - Developer Quick Reference Card

## 🚀 Quick Start (Copy & Paste)

### Windows
```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
python app/main.py

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

### Linux/Mac
```bash
# Terminal 1: Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app/main.py

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

---

## 📍 Access Points

```
Frontend:      http://localhost:3000
Backend:       http://localhost:8000
API Docs:      http://localhost:8000/docs
```

---

## 🔐 Login Credentials

### User
```
ID:       hdocuser
Password: HDOC@123
```

### Admin
```
ID:       admin
Password: Admin@HDOC
```

---

## 📚 Key Files Location

| What | Where |
|------|-------|
| React Pages | frontend/src/pages/ |
| Authentication | frontend/src/context/AuthContext.js |
| API Calls | frontend/src/utils/api.js |
| Styles | frontend/src/index.css |
| Backend API | backend/app/main.py |
| Users Data | backend/data/users.json |
| Config | frontend/tailwind.config.js |

---

## 🔧 Common Commands

### Frontend
```bash
npm start              # Run dev server
npm run build          # Build for production
npm install <package> # Install package
npm uninstall <pkg>  # Remove package
npm test              # Run tests
```

### Backend
```bash
python app/main.py                # Run server
pip install <package>              # Install package
pip freeze > requirements.txt      # Export dependencies
python -m venv venv                # Create virtual env
source venv/bin/activate          # Activate (Linux/Mac)
venv\Scripts\activate             # Activate (Windows)
```

---

## 📊 API Quick Reference

### Login
```
POST /api/auth/login
Body: {"user_id": "hdocuser", "password": "HDOC@123"}
Returns: {token, user}
```

### Get Balance
```
GET /api/banking/balance
Auth: Bearer <token>
Returns: {balance}
```

### Admin: Get Users
```
GET /api/admin/users
Auth: Bearer <admin_token>
Returns: {users}
```

### Admin: Update Balance
```
POST /api/admin/update-balance
Body: {"user_id": "hdocuser", "balance": 500000}
```

---

## 🎨 Design Colors

```javascript
Primary:    #0066ff (Blue)
Secondary:  #1a1f3a (Dark Navy)
Accent:     #00d4ff (Cyan)
Dark BG:    #0f1419
Light BG:   #f5f7fa
Success:    #10b981 (Green)
Error:      #ef4444 (Red)
Warning:    #f59e0b (Orange)
```

---

## 📱 Components

### Pages (5)
- LandingPage
- LoginPage
- Dashboard
- AdminLogin
- AdminPanel

### Contexts (1)
- AuthContext

### Utilities (1)
- API client

---

## 🔗 File Structure

```
frontend/src/
├── pages/          # Full page components
├── context/        # Global state
├── utils/          # Helper functions
├── App.js          # Main component
├── index.js        # Entry point
└── index.css       # Global styles

backend/app/
├── main.py         # FastAPI app
├── routes/         # API routes (folder)
└── models/         # Data models (folder)

backend/data/
├── users.json      # User database
└── admin.json      # Admin data
```

---

## 🧪 Testing Checklist

### Landing Page
- [ ] Hero section visible
- [ ] Navigation works
- [ ] Features display
- [ ] CTA buttons work

### Login
- [ ] Form accepts input
- [ ] Demo login works
- [ ] Error messages show
- [ ] Redirect to dashboard

### Dashboard
- [ ] Balance displays
- [ ] Transactions show
- [ ] Charts render
- [ ] Cards visible
- [ ] Sidebar toggles

### Admin
- [ ] Admin login works
- [ ] User table displays
- [ ] Search filters users
- [ ] Balance can be edited
- [ ] Changes persist

---

## 🐛 Troubleshooting Quick Tips

| Problem | Solution |
|---------|----------|
| Port in use | `netstat -ano \| findstr :8000` |
| Module not found | `npm install` or `pip install -r requirements.txt` |
| Login fails | Check credentials: hdocuser / HDOC@123 |
| API not connecting | Verify backend running on 8000 |
| Charts not showing | Check Network tab for data |
| Styles not applying | Rebuild: `npm start` |

---

## 📝 Editing Guide

### Change Color Scheme
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR',
}
```

### Add New User
Edit `backend/data/users.json`:
```json
{
  "id": 4,
  "user_id": "newuser",
  "name": "New Name",
  "password": "Password@123"
}
```

### Change API Port
Edit `backend/app/main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

---

## 🚀 Deployment Quick Steps

### Frontend (Netlify)
```bash
npm run build
# Deploy build/ folder to Netlify
```

### Backend (Heroku)
```bash
heroku create your-app
git push heroku main
```

---

## 📖 Documentation Quick Links

```
Setup:         GETTING_STARTED.md
Features:      FEATURES.md
API:           API_DOCUMENTATION.md
Files:         FILE_STRUCTURE.md
Issues:        TROUBLESHOOTING.md
Deploy:        TROUBLESHOOTING.md (section)
```

---

## 💾 Database Quick Reference

### User Object
```json
{
  "id": 1,
  "user_id": "hdocuser",
  "name": "Name",
  "email": "email@example.com",
  "balance": 254892.50,
  "account_number": "1234567890",
  "ifsc_code": "HDOC0000123",
  "branch": "Branch Name",
  "status": "active"
}
```

### Transaction Object
```json
{
  "type": "credit",
  "description": "Description",
  "amount": 1000,
  "date": "Today",
  "time": "09:30 AM",
  "status": "completed"
}
```

---

## 🔒 Security Checklist

- [ ] Change demo credentials
- [ ] Use environment variables
- [ ] Enable HTTPS
- [ ] Validate all inputs
- [ ] Use secure headers
- [ ] Implement rate limiting
- [ ] Add logging
- [ ] Monitor errors

---

## 📊 Performance Tips

1. Minify CSS/JS: `npm run build`
2. Enable caching
3. Optimize images
4. Use CDN
5. Database indexing
6. API pagination
7. Lazy loading
8. Code splitting

---

## 🎯 Customization Checklist

- [ ] Change logo/branding
- [ ] Update colors
- [ ] Add custom pages
- [ ] Modify API endpoints
- [ ] Update credentials
- [ ] Change demo data
- [ ] Add animations
- [ ] Custom charts

---

## 📞 Common Issues & Fixes

```bash
# Port 8000 in use?
taskkill /PID <pid> /F

# Npm modules missing?
npm install --legacy-peer-deps

# Backend won't import?
pip install --upgrade -r requirements.txt

# Frontend blank page?
Clear browser cache (Ctrl+Shift+Del)

# Charts not showing?
Check API response in Network tab

# Login loop?
Clear localStorage (F12 → Application)
```

---

## ✅ Pre-Launch Checklist

- [ ] All files created
- [ ] Backend runs without errors
- [ ] Frontend starts successfully
- [ ] Login works with demo creds
- [ ] Dashboard displays data
- [ ] Admin panel functional
- [ ] Charts render
- [ ] Mobile responsive
- [ ] No console errors

---

## 📅 Development Workflow

```
1. Make code changes
2. Save files
3. Frontend auto-reloads
4. Backend: restart if needed
5. Test in browser
6. Check console for errors
7. Commit changes
8. Deploy when ready
```

---

## 🎓 Learning Path

1. Start with README.md
2. Run GETTING_STARTED.md
3. Test all features
4. Read FEATURES.md
5. Study API_DOCUMENTATION.md
6. Review FILE_STRUCTURE.md
7. Customize colors/data
8. Deploy application

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

---

## 🔄 Git Workflow

```bash
git init
git add .
git commit -m "Initial commit"
git branch feature/new-feature
git checkout feature/new-feature
# Make changes
git commit -m "Add new feature"
git checkout main
git merge feature/new-feature
```

---

## 🚀 Deployment Commands

```bash
# Frontend build
cd frontend && npm run build

# Backend production
pip install gunicorn
gunicorn app.main:app

# Docker
docker build -t hdoc-bank .
docker run -p 8000:8000 hdoc-bank
```

---

## 🆘 Emergency Contacts

**Can't Login?**
→ Use demo: hdocuser / HDOC@123

**Backend Crashed?**
→ Check logs, restart: python app/main.py

**Frontend Frozen?**
→ Hard refresh: Ctrl+Shift+R

**Database Corrupted?**
→ Restore from backup or reset JSON files

---

**Keep This Handy! 📌**

---

Version: 1.0
Last Updated: 2024
