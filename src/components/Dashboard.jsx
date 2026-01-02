import { BarChart, LineChart, PieChart, TrendingUp, Users, Activity, Zap } from 'lucide-react';

export const Dashboard = ({ user }) => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+8.2%',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Performance',
      value: '94 ms',
      change: '-5.3%',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user}</h1>
        <p className="text-gray-300">Here's what's happening with your business today</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.bgColor} p-4 rounded-xl`}>
                <div className={`bg-gradient-to-br ${metric.color} p-2 rounded-lg text-white`}>
                  {metric.icon}
                </div>
              </div>
              <span className="text-green-500 text-sm font-semibold">{metric.change}</span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
            <BarChart className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Chart visualization area</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Revenue trend over the past 12 months</p>
            </div>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Distribution</h3>
            <PieChart className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Market distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { title: 'New user registration', time: '2 hours ago', type: 'success' },
            { title: 'System maintenance completed', time: '4 hours ago', type: 'info' },
            { title: 'Revenue milestone reached', time: '1 day ago', type: 'success' },
            { title: 'New API integration deployed', time: '2 days ago', type: 'info' }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
