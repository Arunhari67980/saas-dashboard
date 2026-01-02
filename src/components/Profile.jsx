import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Save, X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from './Toast';

export const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    email: `${user}@example.com`,
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, City, State 12345',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    bio: 'Administrator'
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const { toasts, success, error, removeToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(`profile_${user}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setOriginalData(parsed);
    } else {
      const initialData = {
        email: `${user}@example.com`,
        phone: '+1 (555) 123-4567',
        address: '123 Business Street, City, State 12345',
        github: 'https://github.com/username',
        linkedin: 'https://linkedin.com/in/username',
        twitter: 'https://twitter.com/username',
        bio: 'Administrator'
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [user]);

  useEffect(() => {
    setHasChanges(JSON.stringify(formData) !== JSON.stringify(originalData));
  }, [formData, originalData]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.github && !validateUrl(formData.github)) {
      newErrors.github = 'Please enter a valid URL';
    }
    
    if (formData.linkedin && !validateUrl(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid URL';
    }
    
    if (formData.twitter && !validateUrl(formData.twitter)) {
      newErrors.twitter = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      error('Please fix the errors before saving');
      return;
    }
    
    localStorage.setItem(`profile_${user}`, JSON.stringify(formData));
    setOriginalData({ ...formData });
    setIsEditing(false);
    success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {user?.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{user}</h3>
            <input
              type="text"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              disabled={!isEditing}
              className={`mt-1 bg-transparent outline-none text-gray-600 dark:text-gray-400 ${isEditing ? 'border-b border-gray-300 dark:border-gray-600' : 'border-none'} focus:border-blue-500`}
              placeholder="Your bio"
            />
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Member since January 2024</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
            <div className={`flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            }`}>
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder={`${user}@example.com`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <div className={`flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            }`}>
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="123 Business Street, City, State 12345"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Links</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border ${
              errors.github ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            }`}>
              <Github className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="https://github.com/username"
              />
            </div>
            {errors.github && <p className="text-sm text-red-500 ml-12">{errors.github}</p>}
          </div>
          <div className="space-y-2">
            <div className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border ${
              errors.linkedin ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            }`}>
              <Linkedin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            {errors.linkedin && <p className="text-sm text-red-500 ml-12">{errors.linkedin}</p>}
          </div>
          <div className="space-y-2">
            <div className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border ${
              errors.twitter ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            }`}>
              <Twitter className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                disabled={!isEditing}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                placeholder="https://twitter.com/username"
              />
            </div>
            {errors.twitter && <p className="text-sm text-red-500 ml-12">{errors.twitter}</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
