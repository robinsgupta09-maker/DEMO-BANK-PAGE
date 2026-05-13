# 📁 Project File Structure & Description

## 🏢 Root Level Files

```
bank website/
├── README.md                    # Main project documentation
├── GETTING_STARTED.md          # Quick start guide
├── FEATURES.md                 # Complete feature documentation
├── API_DOCUMENTATION.md        # API reference guide
├── setup.bat                   # Windows setup script
├── setup.sh                    # Linux/Mac setup script
├── .gitignore                  # Git ignore rules
├── frontend/                   # React frontend
└── backend/                    # FastAPI backend
```

---

## 🎨 Frontend Structure

```
frontend/
├── public/
│   └── index.html             # Main HTML file
├── src/
│   ├── pages/                 # Page components
│   │   ├── LandingPage.js     # Landing/home page
│   │   ├── LoginPage.js       # User login page
│   │   ├── Dashboard.js       # User dashboard
│   │   ├── AdminLogin.js      # Admin login page
│   │   └── AdminPanel.js      # Admin dashboard
│   ├── components/            # Reusable components (expandable)
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── utils/
│   │   └── api.js             # API client & endpoints
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── package.json               # Node dependencies
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
└── DEPENDENCIES.md            # Frontend dependencies info
```

---

## 🔧 Backend Structure

```
backend/
├── app/
│   ├── main.py                # FastAPI main application
│   ├── routes/                # API route handlers (expandable)
│   └── models/                # Pydantic models (expandable)
├── data/
│   ├── users.json             # User database (JSON)
│   └── admin.json             # Admin database (JSON)
├── requirements.txt           # Python dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # Backend documentation
```

---

## 📄 File Descriptions

### Frontend Files

#### `public/index.html`
- Main HTML template
- Google Fonts link
- Root div for React
- Meta tags for responsiveness

#### `src/index.js`
- React entry point
- Creates root element
- Renders App component

#### `src/App.js`
- Main application component
- Router setup with React Router
- Protected route wrapper
- Route definitions for all pages

#### `src/index.css`
- Tailwind imports
- Global styles
- Custom animations
- Glassmorphism effects
- Button styles
- Input styles
- Custom utilities

#### `src/context/AuthContext.js`
- React Context for authentication
- Login/logout functions
- User state management
- Admin state management
- useAuth hook

#### `src/utils/api.js`
- Axios API client
- API base URL configuration
- Request interceptors (JWT)
- API endpoint definitions
- Auth, banking, and admin API calls

#### `src/pages/LandingPage.js`
- Home page component
- Navigation bar
- Hero section
- Features showcase
- Security information
- Testimonials
- CTA sections
- Footer
- Responsive design

#### `src/pages/LoginPage.js`
- User login form
- User ID input
- Password input with toggle
- Remember me checkbox
- Demo login button
- Error handling
- Loading states

#### `src/pages/Dashboard.js`
- Main user banking dashboard
- Sidebar navigation
- Header with notifications
- Account balance card
- Quick action buttons
- Recent transactions
- Cards display
- Charts (Line, Bar, Pie)
- Security alerts
- Dark mode support

#### `src/pages/AdminLogin.js`
- Admin authentication form
- Admin ID input
- Password input with toggle
- Demo admin login
- Restricted access warning
- Error handling

#### `src/pages/AdminPanel.js`
- Admin dashboard
- Statistics cards
- User management table
- Search functionality
- User editing modal
- Balance updates
- Account freezing
- User deletion
- Analytics views
- Transaction graphs

#### `tailwind.config.js`
- Tailwind CSS configuration
- Custom color scheme
- Extended theme options
- Custom animations
- Gradient definitions

#### `postcss.config.js`
- PostCSS configuration
- Tailwind plugin
- Autoprefixer plugin

#### `package.json`
- Project metadata
- npm scripts
- Dependencies list:
  - React
  - React Router
  - Axios
  - Framer Motion
  - Recharts
  - Lucide React
  - Tailwind CSS
- Dev dependencies

#### `.env`
- API base URL configuration
- Environment variables

---

### Backend Files

#### `app/main.py`
- FastAPI application initialization
- CORS middleware configuration
- Database initialization
- Pydantic models:
  - LoginRequest
  - User
  - LoginResponse
  - Transaction
- Authentication functions:
  - JWT token creation
  - Token verification
- Database helpers:
  - get_users()
  - save_users()
  - get_admin()
- API Routes:
  - Auth endpoints (/auth/*)
  - Banking endpoints (/banking/*)
  - Admin endpoints (/admin/*)
- Default demo data

#### `data/users.json`
- User database file
- Stores:
  - User credentials
  - Account information
  - Balance
  - Transaction history
  - Account status
  - Account metadata

#### `data/admin.json`
- Admin database file
- Admin credentials
- Admin metadata

#### `requirements.txt`
- Python package dependencies:
  - FastAPI
  - Uvicorn
  - Pydantic
  - PyJWT
  - python-dotenv
  - Others

---

## 🔄 Data Flow

### User Login Flow
```
1. User enters credentials
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials against users.json
   ↓
4. JWT token generated
   ↓
5. Token + User data returned
   ↓
6. Frontend stores token in localStorage
   ↓
7. Frontend redirects to /dashboard
   ↓
8. All API calls include token in header
   ↓
9. Backend verifies token on each request
```

### Dashboard Data Flow
```
1. Dashboard component mounts
   ↓
2. Fetches user balance via API
   ↓
3. Fetches transactions
   ↓
4. Fetches cards
   ↓
5. Fetches analytics data
   ↓
6. All data displayed with animations
   ↓
7. User can interact with components
```

### Admin Operations Flow
```
1. Admin logs in
   ↓
2. Admin token stored
   ↓
3. Can search users
   ↓
4. Can edit user balance
   ↓
5. Changes saved to users.json
   ↓
6. Changes reflected in UI
```

---

## 📦 Key Dependencies

### Frontend
- **React**: UI library
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Recharts**: Charts
- **Lucide React**: Icons
- **Axios**: HTTP client

### Backend
- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **PyJWT**: JWT handling
- **python-dotenv**: Environment variables

---

## 🔧 Configuration Files

### Frontend Configs
- `tailwind.config.js`: Tailwind CSS customization
- `postcss.config.js`: PostCSS plugins
- `.env`: API endpoint configuration
- `package.json`: Dependencies and scripts

### Backend Configs
- `requirements.txt`: Python dependencies
- `app/main.py`: FastAPI configuration
- `data/`: JSON database files

---

## 🎯 File Purposes Summary

| File | Purpose | Type |
|------|---------|------|
| App.js | Main application & routing | Component |
| AuthContext.js | Global auth state | Context |
| api.js | API client & calls | Utility |
| LandingPage.js | Home page | Page |
| LoginPage.js | User login | Page |
| Dashboard.js | User dashboard | Page |
| AdminLogin.js | Admin login | Page |
| AdminPanel.js | Admin dashboard | Page |
| main.py | Backend server | Backend |
| users.json | User database | Data |
| admin.json | Admin data | Data |
| index.css | Global styles | Style |
| index.js | React entry | Script |

---

## 🚀 How Files Work Together

1. **Initialization**
   - `index.js` loads React
   - `App.js` sets up routing
   - `AuthContext.js` manages authentication

2. **Landing Page**
   - `LandingPage.js` renders static content
   - Navigation links to `/login`

3. **Login Flow**
   - `LoginPage.js` collects credentials
   - `api.js` sends to backend
   - `AuthContext.js` stores token

4. **Dashboard**
   - `Dashboard.js` uses `AuthContext` for user data
   - `api.js` fetches account data
   - Components render data

5. **Admin Panel**
   - `AdminLogin.js` for authentication
   - `AdminPanel.js` for management
   - `api.js` calls admin endpoints
   - Changes saved to `users.json`

---

## 📝 Documentation Files

| File | Content |
|------|---------|
| README.md | Project overview & setup |
| GETTING_STARTED.md | Quick start guide |
| FEATURES.md | Detailed feature list |
| API_DOCUMENTATION.md | API reference |
| DEPENDENCIES.md | Dependency info |

---

## 🛠️ Modification Guide

### To Add a New Page
1. Create `.js` file in `src/pages/`
2. Add route in `App.js`
3. Import and define in Routes

### To Add an API Endpoint
1. Add route in `backend/app/main.py`
2. Add API call in `frontend/src/utils/api.js`
3. Use in component

### To Add a Feature
1. Create component in `src/components/`
2. Import in relevant page
3. Add styling to `index.css`

### To Customize Colors
1. Edit `tailwind.config.js`
2. Update `index.css` gradients
3. Rebuild frontend

---

## ✅ File Checklist

Frontend Files:
- ✅ App.js
- ✅ index.js
- ✅ index.css
- ✅ AuthContext.js
- ✅ api.js
- ✅ LandingPage.js
- ✅ LoginPage.js
- ✅ Dashboard.js
- ✅ AdminLogin.js
- ✅ AdminPanel.js
- ✅ package.json
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ .env

Backend Files:
- ✅ main.py
- ✅ users.json
- ✅ admin.json
- ✅ requirements.txt

Documentation:
- ✅ README.md
- ✅ GETTING_STARTED.md
- ✅ FEATURES.md
- ✅ API_DOCUMENTATION.md

---

**Complete & Ready for Development! 🎉**
