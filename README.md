# Advanced SaaS Dashboard

A modern, fully-featured SaaS dashboard built with React, Vite, and Tailwind CSS. This project demonstrates advanced component architecture, state management, and responsive design patterns.

> 📖 **For complete project documentation, see [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**

## 🚀 Features

- **Modern UI Components**: Built with Tailwind CSS for a professional, responsive design
- **Authentication System**: Context-based auth with login/logout functionality
- **Theme Support**: Dark/Light mode switching with persistent theme context
- **Advanced Dashboard**: 
  - Real-time statistics and metrics
  - Interactive charts and visualizations
  - User tables with sorting and filtering
  - Activity feeds and notifications
- **Responsive Layout**: Mobile-first design that works seamlessly on all devices
- **Icon Library**: Lucide React icons for beautiful, scalable icons
- **State Management**: React Context API for global state management
- **Code Quality**: ESLint configuration for code consistency

## 📋 Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Modern JavaScript

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saas-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
saas-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard with metrics & charts
│   │   ├── Layout.jsx         # App layout (Sidebar + Header)
│   │   ├── Profile.jsx        # User profile management
│   │   ├── Settings.jsx       # Comprehensive settings page (7 tabs)
│   │   ├── Tables.jsx         # User management with CRUD operations
│   │   ├── Alerts.jsx         # Alert notifications page
│   │   ├── Modal.jsx          # Reusable modal component
│   │   └── Toast.jsx          # Toast notification system
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── hooks/
│   │   ├── useAuth.js         # Authentication hook
│   │   └── useToast.js        # Toast notification hook
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles & animations
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
├── postcss.config.js          # PostCSS configuration
├── PROJECT_SUMMARY.md         # Complete project documentation
└── package.json               # Dependencies
```

## 🎨 Features Overview

### 📊 Dashboard Page
- **4 Key Metrics Cards**: Revenue, Active Users, System Health, Performance
- **Interactive Revenue Chart**: 12-month bar chart with hover tooltips
- **Distribution Chart**: Percentage breakdown by category
- **Recent Activity Feed**: Real-time activity updates
- **Auto-refresh**: Data updates every 5 seconds
- **Toast Notifications**: User feedback system

### 👥 User Management (Tables Page)
- **Full CRUD Operations**: Create, Read, Update, Delete users
- **Advanced Search**: Search by name or email
- **Multi-Filter System**: Filter by role and status
- **Column Sorting**: Sort by any column (ascending/descending)
- **Pagination**: 5 users per page with navigation
- **CSV Export**: Export filtered/sorted data
- **Modal Dialogs**: Edit and delete confirmation modals

### 👤 Profile Page
- **Profile Header**: Avatar, name, bio with upload option
- **Contact Information**: Email, phone, address (all validated)
- **Social Links**: GitHub, LinkedIn, Twitter (URL validated)
- **Edit Mode**: Toggle edit with change tracking
- **Form Validation**: Real-time validation with error messages
- **Data Persistence**: Saves to localStorage per user

### ⚙️ Settings Page (7 Comprehensive Tabs)
1. **Account**: User info, timezone, language, data export/delete
2. **Security**: Password change, 2FA, login alerts, session management
3. **Notifications**: Email, push, SMS notification preferences
4. **Privacy**: Profile visibility, data sharing, analytics, cookies
5. **Billing**: Plan info, payment method, auto-renewal, billing history
6. **API Keys**: Generate, view, delete API keys with security info
7. **Appearance**: Font size, compact mode, sidebar, animations

### 🔔 Alerts Page
- **4 Alert Types**: Success, Error, Warning, Info
- **Dismissible Alerts**: Close button on each alert
- **Color-Coded**: Visual indicators by type
- **Icon System**: Appropriate icons for each alert type

### 🔐 Authentication
- **Role-Based Login**: Admin, Manager, User roles
- **Session Management**: Persistent login with localStorage
- **Protected Routes**: Redirects to login if not authenticated
- **Logout Functionality**: Clears session and redirects

### 🎨 UI/UX Features
- **Fully Responsive**: Mobile, tablet, desktop support
- **Smooth Animations**: Transitions and hover effects
- **Toast Notifications**: Global notification system
- **Modal Dialogs**: Reusable modal component
- **Loading States**: Spinner animations
- **Form Validation**: Real-time error display

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   - Navigate to http://localhost:5173/
   - Login with any role (Admin/Manager/User)

4. **Explore Features**:
   - View dashboard metrics and charts
   - Manage users in the Users page
   - Update profile information
   - Configure settings (7 different tabs)
   - View alerts and notifications

5. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

## 📝 Configuration

### Tailwind CSS
Customize your theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: 'your-color',
    }
  }
}
```

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```
VITE_API_URL=https://api.example.com
```

## 📦 Dependencies

See `package.json` for complete list of dependencies and versions.

## 🔧 Development

- **Hot Module Replacement (HMR)**: Changes are reflected instantly
- **Fast Build**: Vite provides extremely fast build times
- **ESLint**: Code quality checking with ESLint

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Router](https://reactrouter.com)

## 📖 Complete Documentation

For detailed information about:
- All pages and their features
- Component breakdown
- Real-time implementation roadmap
- Real-world usage scenarios
- Future enhancements
- Architecture patterns

**See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** for complete project documentation.

## 🎯 Key Highlights

- ✅ **7 Major Pages**: Login, Dashboard, Users, Profile, Settings, Alerts
- ✅ **Full CRUD Operations**: Complete user management system
- ✅ **7 Settings Tabs**: Account, Security, Notifications, Privacy, Billing, API Keys, Appearance
- ✅ **Real-Time Ready**: Architecture prepared for WebSocket integration
- ✅ **Production Ready**: Clean code, responsive design, error handling
- ✅ **Extensible**: Easy to add new features and integrate backend

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by Arun

---

**Happy coding! 🎉**
