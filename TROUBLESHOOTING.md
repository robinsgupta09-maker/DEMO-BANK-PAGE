# HDOC Bank - Troubleshooting & Deployment Guide

## 🔧 Troubleshooting

### Backend Issues

#### 1. Backend Won't Start

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port
python app/main.py --port 8001
```

#### 2. ModuleNotFoundError

**Error**: `No module named 'fastapi'`

**Solution**:
```bash
cd backend
pip install --upgrade -r requirements.txt
```

#### 3. Database File Not Found

**Error**: `FileNotFoundError: [Errno 2] No such file or directory: 'data/users.json'`

**Solution**:
```bash
# The app should auto-create these files
# If not, manually create them:
mkdir data
touch data/users.json
touch data/admin.json
```

#### 4. CORS Errors

**Error**: `Access to XMLHttpRequest... blocked by CORS policy`

**Solution**:
- Ensure backend is running on port 8000
- Check CORS configuration in `app/main.py`
- Verify frontend API URL in `.env`

#### 5. JWT Token Errors

**Error**: `Invalid token` or `Token expired`

**Solution**:
```bash
# Clear browser storage
localStorage.clear()
# Re-login to get new token
```

---

### Frontend Issues

#### 1. Frontend Won't Start

**Error**: `Port 3000 already in use`

**Solution**:
```bash
# Kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

#### 2. npm install Fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

#### 3. Dependencies Missing

**Error**: `Module not found: Can't resolve 'framer-motion'`

**Solution**:
```bash
npm install
# Or install specific package
npm install framer-motion
```

#### 4. React Router Not Working

**Error**: `Cannot GET /login`

**Solution**:
- Ensure App.js has proper route definitions
- Check BrowserRouter is wrapping Routes
- Verify page components are exported

#### 5. Charts Not Displaying

**Error**: Charts render but show no data

**Solution**:
- Check API response in Network tab
- Verify data structure matches chart expectations
- Check browser console for errors

---

### Database Issues

#### 1. Data Not Persisting

**Error**: Changes lost after refresh

**Solution**:
- Verify backend is running
- Check data/ folder exists
- Confirm write permissions

#### 2. Corrupted JSON

**Error**: `json.decoder.JSONDecodeError`

**Solution**:
- Check JSON syntax in data/ files
- Use JSON validator
- Reset to default data

---

### Authentication Issues

#### 1. Login Not Working

**Error**: "Invalid credentials" message

**Solution**:
- Verify credentials:
  - User: `hdocuser` / `HDOC@123`
  - Admin: `admin` / `Admin@HDOC`
- Check backend is running
- Review console logs

#### 2. Token Not Stored

**Error**: Logged in but dashboard shows not authenticated

**Solution**:
```javascript
// Check localStorage
console.log(localStorage.getItem('token'))

// Should return JWT token
```

#### 3. Admin Access Denied

**Error**: Can't access /admin panel

**Solution**:
- Verify admin login
- Check admin_token in localStorage
- Clear localStorage and re-login

---

### Performance Issues

#### 1. Slow Loading

**Solution**:
- Enable browser caching
- Minify CSS/JS: `npm run build`
- Optimize images
- Check network speed

#### 2. High Memory Usage

**Solution**:
- Check for memory leaks
- Close unused tabs
- Clear browser cache
- Restart browser

---

## 🚀 Deployment Guide

### Frontend Deployment

#### Option 1: Netlify

1. **Build the project**:
```bash
cd frontend
npm run build
```

2. **Connect to Netlify**:
- Go to https://netlify.com
- Create new site
- Connect GitHub repo
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `build`

3. **Configure environment**:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

#### Option 2: Vercel

1. **Build project**:
```bash
npm run build
```

2. **Deploy to Vercel**:
- Go to https://vercel.com
- Import project
- Configure build settings
- Deploy

#### Option 3: GitHub Pages

1. **Build project**:
```bash
npm run build
```

2. **Deploy**:
```bash
npm install gh-pages
npm run build
npm run deploy
```

---

### Backend Deployment

#### Option 1: Heroku

1. **Create Procfile**:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

2. **Deploy**:
```bash
heroku login
heroku create hdoc-bank-api
git push heroku main
```

#### Option 2: DigitalOcean

1. **Create droplet**:
- Ubuntu 22.04
- 1GB RAM minimum

2. **Install dependencies**:
```bash
sudo apt update
sudo apt install python3-pip
pip install -r requirements.txt
```

3. **Run with Gunicorn**:
```bash
pip install gunicorn
gunicorn app.main:app
```

#### Option 3: AWS

1. **Elastic Beanstalk**:
```bash
pip install awsebcli
eb init
eb create hdoc-bank-env
eb deploy
```

2. **EC2**:
- Launch instance
- Install Python
- Install dependencies
- Run with supervisor

#### Option 4: Docker

Create `Dockerfile`:
```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]
```

Build and run:
```bash
docker build -t hdoc-bank .
docker run -p 8000:8000 hdoc-bank
```

---

### Database Migration

#### Migrate from JSON to PostgreSQL

1. **Install PostgreSQL**:
```bash
pip install psycopg2-binary sqlalchemy
```

2. **Update `main.py`**:
```python
from sqlalchemy import create_engine
DATABASE_URL = "postgresql://user:password@localhost/hdoc_bank"
engine = create_engine(DATABASE_URL)
```

3. **Create migration script**:
```python
# Migrate data from JSON to DB
```

#### Migrate from JSON to MongoDB

1. **Install MongoDB driver**:
```bash
pip install pymongo
```

2. **Update `main.py`**:
```python
from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client["hdoc_bank"]
```

---

## 📋 Pre-Deployment Checklist

### Frontend
- [ ] Remove demo data/credentials from code
- [ ] Set production API URL
- [ ] Enable HTTPS
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Test on multiple browsers
- [ ] Test responsive design
- [ ] Check accessibility
- [ ] Setup error logging
- [ ] Configure analytics

### Backend
- [ ] Hash passwords properly
- [ ] Validate all inputs
- [ ] Implement rate limiting
- [ ] Setup logging
- [ ] Configure CORS properly
- [ ] Add environment variables
- [ ] Setup database backup
- [ ] Configure monitoring
- [ ] Test all endpoints
- [ ] Security audit

### Database
- [ ] Backup data
- [ ] Test restore process
- [ ] Optimize indexes
- [ ] Set retention policies
- [ ] Configure replication
- [ ] Monitor size
- [ ] Plan scaling

---

## 🔐 Security Best Practices

### Frontend
```javascript
// Don't store sensitive data in localStorage
// Use httpOnly cookies instead
// Validate user input
// Sanitize output
// Use HTTPS always
// Implement CSP headers
```

### Backend
```python
# Hash passwords
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"])

# Validate input
from pydantic import validator

# Use environment variables
import os
SECRET_KEY = os.getenv("SECRET_KEY")

# Rate limiting
from slowapi import Limiter
```

### General
- Use HTTPS everywhere
- Implement CORS properly
- Validate all inputs
- Sanitize outputs
- Use secure headers
- Implement logging
- Monitor for threats
- Keep dependencies updated
- Use secrets management
- Regular security audits

---

## 📊 Monitoring & Logging

### Setup Logging

**Backend**:
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

### Setup Error Tracking

**Sentry Integration**:
```bash
pip install sentry-sdk
```

```python
import sentry_sdk
sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0
)
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Frontend
        run: cd frontend && npm install && npm run build
      - name: Deploy Backend
        run: cd backend && pip install -r requirements.txt
```

---

## 📈 Scaling Strategies

### Vertical Scaling
- Increase server resources
- Add more RAM
- Upgrade CPU

### Horizontal Scaling
- Load balancing
- Multiple instances
- Database replication
- Caching layers

### Optimization
- Code optimization
- Database indexing
- API caching
- CDN for static files

---

## 🆘 Common Production Issues

### High Traffic
- Implement caching
- Use CDN
- Database optimization
- Load balancing

### Memory Leaks
- Code review
- Profiling tools
- Regular monitoring
- Automated tests

### Database Slowness
- Add indexes
- Optimize queries
- Database replication
- Connection pooling

---

## 📞 Getting Help

1. Check logs first
2. Review error messages
3. Search similar issues
4. Check documentation
5. Ask in forums
6. Contact support

---

**Ready for Production! 🚀**
