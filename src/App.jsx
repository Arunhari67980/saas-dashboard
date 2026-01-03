import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Sidebar, Header } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Tables } from './components/Tables';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Alerts } from './components/Alerts';

function App() {
  const { user, login, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      login(savedUser);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-900 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">SaaS Dashboard</h1>
              <p className="text-gray-600">Advanced Analytics & Management Platform</p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => login('admin')}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                  Login as Admin
                </span>
              </button>

              <button
                onClick={() => login('manager')}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17 11a1 1 0 01-1 1H2a1 1 0 01-1-1V9m0 0a2 2 0 012-2h12a2 2 0 012 2m0 0V7a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2z"></path>
                  </svg>
                  Login as Manager
                </span>
              </button>

              <button
                onClick={() => login('user')}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  Login as User
                </span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-xs mt-6">
              © 2026 SaaS Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          user={user}
          logout={logout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
            user={user}
          />

          {/* Routes */}
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/users" element={<Tables />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/settings" element={<Settings user={user} />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;