# 🏦 HDOC Bank - Premium Digital Banking Website

A complete, fully functional banking website with React frontend and FastAPI backend. Features a premium fintech UI with authentication, user dashboard, admin panel, and realistic banking features.

## 🎯 Features

### Landing Page
- Hero section with compelling banking messaging
- Features showcase (Security, Speed, Analytics, Support)
- Security information section
- Customer testimonials
- CTA sections
- Responsive footer

### User Authentication
- Secure login with JWT tokens
- Demo credentials: `hdocuser` / `HDOC@123`
- Password visibility toggle
- Remember me functionality
- Error handling and validation
- Session management

### User Dashboard
- Welcome message with real-time updates
- Account balance display with hide/show toggle
- Account details (Account Number, IFSC, Branch)
- Quick action buttons (Send Money, Receive, Pay Bills, Download)
- Recent transactions with status indicators
- Debit/Credit cards display
- Monthly spending analytics (Line chart)
- Income vs Expenses comparison (Bar chart)
- Spending by category (Pie chart)
- Security alerts and notifications
- Dark mode
- Responsive design for all devices

### Admin Panel
- Admin authentication: `admin` / `Admin@HDOC`
- User management dashboard
- Real-time user search
- Balance management for users
- User status control (Active/Frozen)
- User deletion
- Account statistics
- Analytics dashboards
- Transaction management
- System analytics

### Design Features
- Ultra-modern fintech UI
- Glassmorphism effects
- Smooth animations with Framer Motion
- Gradient backgrounds
- Professional color scheme (Blue + Dark Navy)
- Responsive on all devices
- Loading states and transitions
- Interactive hover effects
- Skeleton loading effects

## 🛠 Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router 6.8** - Navigation
- **Tailwind CSS 3.2** - Styling
- **Framer Motion 10** - Animations
- **Recharts 2.5** - Data visualization
- **Lucide React** - Icons
- **Axios 1.3** - API requests

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **PyJWT** - JWT authentication
- **JSON Storage** - Data persistence

## 📁 Project Structure

```
bank website/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminPanel.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   └── models/
│   ├── data/
│   │   ├── users.json
│   │   └── admin.json
│   ├── requirements.txt
│   └── README.md
└── README.md (this file)
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd "bank website\backend"
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python app/main.py
```

The backend will run on `http://localhost:8000`

Visit API docs at: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory in a NEW terminal:
```bash
cd "bank website\frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📱 Demo Credentials

### User Login
- **User ID**: `hdocuser`
- **Password**: `HDOC@123`

### Admin Login
- **Admin ID**: `admin`
- **Password**: `Admin@HDOC`

## 🌐 Accessing the Application

1. **Landing Page**: `http://localhost:3000/`
2. **User Login**: `http://localhost:3000/login`
3. **User Dashboard**: `http://localhost:3000/dashboard` (requires login)
4. **Admin Login**: `http://localhost:3000/admin-login`
5. **Admin Panel**: `http://localhost:3000/admin` (requires admin login)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Banking
- `GET /api/banking/balance` - Get account balance
- `GET /api/banking/transactions` - Get transactions
- `GET /api/banking/cards` - Get user cards
- `GET /api/banking/analytics` - Get analytics data

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `POST /api/admin/update-balance` - Update user balance
- `POST /api/admin/update-profile` - Update user profile
- `POST /api/admin/add-transaction` - Add transaction
- `GET /api/admin/analytics` - Get admin analytics

## 🎨 UI Components

### LandingPage
- Navigation bar with branding
- Hero section
- Features grid
- Security section
- Testimonials carousel
- CTA sections
- Footer

### LoginPage
- Secure login form
- Password visibility toggle
- Remember me checkbox
- Error messages
- Demo login button
- Security information

### Dashboard
- Sidebar navigation
- Header with notifications
- Balance card with visibility toggle
- Quick action buttons
- Transaction history
- Card management
- Charts and analytics
- Security alerts

### AdminPanel
- Admin-only features
- User management table
- Search functionality
- User editing modal
- Balance updates
- Account status management
- Analytics and reports

## 🔐 Security Features

- JWT authentication
- Password hashing simulation
- Protected routes
- Token-based authorization
- CORS configuration
- Input validation
- Error handling

## 📈 Charts & Analytics

- Line charts for spending trends
- Bar charts for income vs expenses
- Pie charts for expense categories
- Real-time data updates
- Interactive tooltips
- Responsive sizing

## 🎬 Animations

- Page transitions
- Component fade-ins
- Hover effects
- Button animations
- Loading states
- Smooth scrolling
- Glassmorphism effects

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop layout
- Touch-friendly controls
- Adaptive navigation
- Flexible grid system

## 🔄 Data Flow

1. User enters credentials on login page
2. Frontend sends login request to backend
3. Backend validates credentials against JSON database
4. JWT token is generated and returned
5. Token stored in localStorage
6. Frontend redirects to dashboard
7. All subsequent requests include JWT token
8. Backend validates token and returns protected data
9. Admin can modify user data
10. Changes reflected in real-time

## 📝 Sample Data

The application comes with sample data:
- 2 pre-configured user accounts
- Transaction history
- Banking analytics
- User cards
- Admin credentials

## 🛡️ Features Implemented

✅ User authentication with JWT
✅ Secure password handling
✅ User dashboard with real data
✅ Admin panel for data management
✅ Transaction history
✅ Balance management
✅ Multiple charts and analytics
✅ Responsive design
✅ Modern UI with animations
✅ Dark mode
✅ Real-time updates
✅ Error handling
✅ Loading states
✅ Search functionality
✅ User management

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
pip install gunicorn
gunicorn app.main:app
```

## 📚 Documentation

- API docs available at `/docs` (Swagger)
- ReDoc available at `/redoc`
- Component documentation included in code

## 🤝 Contributing

Contributions are welcome! Please ensure code follows project conventions.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

1. Use demo credentials to test all features
2. Admin panel allows real-time data modification
3. Animations can be disabled in browser dev tools for testing
4. Check console for API debug information
5. Backend data persists in JSON files

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check if port 8000 is available
- Install all requirements: `pip install -r requirements.txt`

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check CORS configuration
- Verify API URL in .env file

### Login not working
- Use demo credentials: `hdocuser` / `HDOC@123`
- Check browser console for errors
- Ensure backend is running

### Charts not displaying
- Check if data is loading (network tab)
- Verify Recharts is installed
- Clear browser cache

## 📞 Support

For issues or questions, check the console logs for detailed error messages.

---

**HDOC Bank** - Premium Digital Banking Platform Built with ❤️
