import { 
  User, Lock, Bell, Shield, CreditCard, Key, Palette, Globe, 
  Smartphone, Mail, Save, Eye, EyeOff, Trash2, Download, Upload,
  CheckCircle, XCircle, AlertTriangle, Info
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from './Toast';

export const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toasts, success, error, removeToast } = useToast();

  // Account Settings
  const [accountData, setAccountData] = useState({
    username: user || 'admin',
    email: `${user}@example.com`,
    firstName: 'John',
    lastName: 'Doe',
    company: 'SaaS Co.',
    jobTitle: 'Administrator',
    timezone: 'UTC',
    language: 'en'
  });

  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email: {
      marketing: true,
      security: true,
      updates: false,
      weeklyDigest: true
    },
    push: {
      alerts: true,
      reminders: false,
      messages: true
    },
    sms: {
      security: false,
      critical: true
    }
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    analytics: true,
    cookies: true,
    locationTracking: false
  });

  // API Settings
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_live_••••••••••••••••', created: '2024-01-15', lastUsed: '2024-12-20' },
    { id: 2, name: 'Development API', key: 'sk_test_••••••••••••••••', created: '2024-01-10', lastUsed: '2024-12-19' }
  ]);

  // Billing Settings
  const [billing, setBilling] = useState({
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2025-01-15',
    paymentMethod: '•••• •••• •••• 4242',
    autoRenew: true
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    fontSize: 'medium',
    compactMode: false,
    sidebarCollapsed: false,
    animations: true
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedAccount = localStorage.getItem('settings_account');
    const savedNotifications = localStorage.getItem('settings_notifications');
    const savedPrivacy = localStorage.getItem('settings_privacy');
    const savedAppearance = localStorage.getItem('settings_appearance');
    
    if (savedAccount) setAccountData(JSON.parse(savedAccount));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));
    if (savedAppearance) setAppearance(JSON.parse(savedAppearance));
  }, []);

  const handleSave = (section) => {
    switch(section) {
      case 'account':
        localStorage.setItem('settings_account', JSON.stringify(accountData));
        success('Account settings saved successfully!');
        break;
      case 'security':
        if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
          error('New passwords do not match!');
          return;
        }
        success('Security settings updated!');
        break;
      case 'notifications':
        localStorage.setItem('settings_notifications', JSON.stringify(notifications));
        success('Notification preferences saved!');
        break;
      case 'privacy':
        localStorage.setItem('settings_privacy', JSON.stringify(privacy));
        success('Privacy settings updated!');
        break;
      case 'appearance':
        localStorage.setItem('settings_appearance', JSON.stringify(appearance));
        success('Appearance settings saved!');
        break;
      default:
        success('Settings saved successfully!');
    }
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    success('API key deleted successfully!');
  };

  const generateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: `API Key ${apiKeys.length + 1}`,
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
    success('New API key generated!');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'api', label: 'API Keys', icon: <Key className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <button
          onClick={() => handleSave(activeTab)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 flex">
          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-1 w-full flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={accountData.username}
                      onChange={(e) => setAccountData({...accountData, username: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={accountData.email}
                      onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={accountData.firstName}
                      onChange={(e) => setAccountData({...accountData, firstName: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={accountData.lastName}
                      onChange={(e) => setAccountData({...accountData, lastName: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={accountData.company}
                      onChange={(e) => setAccountData({...accountData, company: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={accountData.jobTitle}
                      onChange={(e) => setAccountData({...accountData, jobTitle: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={accountData.timezone}
                      onChange={(e) => setAccountData({...accountData, timezone: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={accountData.language}
                      onChange={(e) => setAccountData({...accountData, language: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Management</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Download className="w-5 h-5" />
                    Export Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 pr-10"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 pr-10"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setSecurityData({...securityData, twoFactorEnabled: !securityData.twoFactorEnabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securityData.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Security Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Login Alerts</p>
                      <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                    </div>
                    <button
                      onClick={() => setSecurityData({...securityData, loginAlerts: !securityData.loginAlerts})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securityData.loginAlerts ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securityData.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={securityData.sessionTimeout}
                      onChange={(e) => setSecurityData({...securityData, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      min="5"
                      max="120"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Chrome on Windows</p>
                        <p className="text-sm text-gray-500">192.168.1.1 • Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">Revoke</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Safari on macOS</p>
                        <p className="text-sm text-gray-500">192.168.1.2 • Last active: 1 day ago</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(notifications.email).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm text-gray-500">Receive {key} emails</p>
                      </div>
                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          email: {...notifications.email, [key]: !value}
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(notifications.push).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{key}</p>
                        <p className="text-sm text-gray-500">Receive {key} push notifications</p>
                      </div>
                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          push: {...notifications.push, [key]: !value}
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">SMS Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(notifications.sms).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{key}</p>
                        <p className="text-sm text-gray-500">Receive {key} SMS notifications</p>
                      </div>
                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          sms: {...notifications.sms, [key]: !value}
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Visibility</h3>
                <div className="space-y-3">
                  {['public', 'private', 'contacts'].map((option) => (
                    <label key={option} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="visibility"
                        value={option}
                        checked={privacy.profileVisibility === option}
                        onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{option}</p>
                        <p className="text-sm text-gray-500">
                          {option === 'public' && 'Anyone can see your profile'}
                          {option === 'private' && 'Only you can see your profile'}
                          {option === 'contacts' && 'Only your contacts can see your profile'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Data Sharing</p>
                      <p className="text-sm text-gray-500">Allow sharing of anonymized data for improvements</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, dataSharing: !privacy.dataSharing})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.dataSharing ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-sm text-gray-500">Help us improve by sharing usage analytics</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, analytics: !privacy.analytics})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.analytics ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.analytics ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cookies</p>
                      <p className="text-sm text-gray-500">Allow cookies for enhanced experience</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, cookies: !privacy.cookies})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.cookies ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.cookies ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Location Tracking</p>
                      <p className="text-sm text-gray-500">Allow location-based features</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, locationTracking: !privacy.locationTracking})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.locationTracking ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          privacy.locationTracking ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Current Plan</h3>
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold">{billing.plan}</p>
                      <p className="text-blue-100">Status: {billing.status}</p>
                    </div>
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-blue-100">Next billing date: {billing.nextBilling}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Card ending in {billing.paymentMethod.split(' ').pop()}</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Update</button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Auto-renewal</p>
                    <p className="text-sm text-gray-500">Automatically renew your subscription</p>
                  </div>
                  <button
                    onClick={() => setBilling({...billing, autoRenew: !billing.autoRenew})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      billing.autoRenew ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        billing.autoRenew ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Billing History</h3>
                <div className="space-y-3">
                  {[
                    { date: '2024-12-15', amount: '$99.00', status: 'Paid' },
                    { date: '2024-11-15', amount: '$99.00', status: 'Paid' },
                    { date: '2024-10-15', amount: '$99.00', status: 'Paid' }
                  ].map((invoice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.date}</p>
                        <p className="text-sm text-gray-500">{invoice.status}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-gray-900">{invoice.amount}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your API keys for programmatic access</p>
                </div>
                <button
                  onClick={generateApiKey}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Key className="w-5 h-5" />
                  Generate New Key
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{apiKey.name}</p>
                        <p className="text-sm text-gray-500 font-mono">{apiKey.key}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Created: {apiKey.created}</span>
                      <span>•</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">API Key Security</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Keep your API keys secure and never share them publicly. Rotate keys regularly for better security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full h-full">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Display Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                    <select
                      value={appearance.fontSize}
                      onChange={(e) => setAppearance({...appearance, fontSize: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Compact Mode</p>
                      <p className="text-sm text-gray-500">Reduce spacing for a more compact view</p>
                    </div>
                    <button
                      onClick={() => setAppearance({...appearance, compactMode: !appearance.compactMode})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearance.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sidebar Collapsed</p>
                      <p className="text-sm text-gray-500">Start with sidebar collapsed by default</p>
                    </div>
                    <button
                      onClick={() => setAppearance({...appearance, sidebarCollapsed: !appearance.sidebarCollapsed})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearance.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Animations</p>
                      <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
                    </div>
                    <button
                      onClick={() => setAppearance({...appearance, animations: !appearance.animations})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearance.animations ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearance.animations ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

