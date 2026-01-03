import { Menu, X, Bell, Settings, LogOut, User, Home, BarChart3, Users, Zap, LifeBuoy, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ isOpen, setIsOpen, user, logout }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/users' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <AlertCircle className="w-5 h-5" />, label: 'Alerts', path: '/alerts' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:translate-x-0 lg:relative lg:w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SaaS Co.
              </h1>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 text-sm capitalize">{user}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const Header = ({ isOpen, setIsOpen, user }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">Dashboard</h1>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {['New user signed up', 'System update completed', 'Payment received'].map((notif, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-gray-900">{notif}</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium hidden sm:block">{user}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 capitalize">{user}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="divide-y divide-gray-200">
                  <Link
                    to="/profile"
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
