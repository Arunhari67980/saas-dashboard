import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export const Profile = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>

      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            {user?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{user}</h3>
            <p className="text-gray-600 dark:text-gray-400">Administrator</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Member since January 2024</p>
          </div>
          <button className="btn-primary">Edit Profile</button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <input type="email" placeholder={`${user}@example.com`} className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <Phone className="w-5 h-5 text-gray-400" />
              <input type="tel" placeholder="+1 (555) 123-4567" className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <input type="text" placeholder="123 Business Street, City, State 12345" className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="card-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Links</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <Github className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="https://github.com/username" className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <Linkedin className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="https://linkedin.com/in/username" className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <Twitter className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="https://twitter.com/username" className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
};
