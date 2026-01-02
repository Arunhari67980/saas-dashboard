# Advanced SaaS Dashboard

A modern, fully-featured SaaS dashboard built with React, Vite, and Tailwind CSS. This project demonstrates advanced component architecture, state management, and responsive design patterns.

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
│   │   ├── Dashboard.jsx      # Main dashboard view
│   │   ├── Layout.jsx         # App layout with navigation
│   │   ├── Profile.jsx        # User profile page
│   │   ├── Tables.jsx         # Data tables
│   │   └── Alerts.jsx         # Alert notifications
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication context
│   │   └── ThemeContext.jsx   # Theme context (dark/light)
│   ├── hooks/
│   │   ├── useAuth.js         # Auth hook
│   │   └── useTheme.js        # Theme hook
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

## 🎨 Features Overview

### Dashboard
- Key metrics display with icons
- Statistics cards
- Recent activity feed
- User analytics

### Authentication
- Login/Logout functionality
- User session management
- Protected routes

### Theme System
- Dark/Light mode toggle
- Theme persistence
- Beautiful transitions

### Components
- Responsive navigation sidebar
- User profile section
- Data tables with sorting
- Alert and notification system
- Modal dialogs

## 🚀 Getting Started

1. Open http://localhost:5173/ in your browser
2. Login with any credentials (demo mode)
3. Explore the dashboard
4. Toggle dark/light mode using the theme switcher
5. Navigate between different sections

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

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by Arun

---

**Happy coding! 🎉**
