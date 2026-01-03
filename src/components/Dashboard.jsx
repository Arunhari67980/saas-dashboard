import { BarChart, LineChart, PieChart, TrendingUp, Users, Activity, Zap, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from './Toast';

export const Dashboard = ({ user }) => {
  const [metrics, setMetrics] = useState([
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+8.2%',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Performance',
      value: '94 ms',
      change: '-5.3%',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]);

  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Apr', value: 61000 },
    { month: 'May', value: 55000 },
    { month: 'Jun', value: 67000 },
    { month: 'Jul', value: 72000 },
    { month: 'Aug', value: 68000 },
    { month: 'Sep', value: 75000 },
    { month: 'Oct', value: 82000 },
    { month: 'Nov', value: 78000 },
    { month: 'Dec', value: 124500 }
  ]);

  const [distributionData, setDistributionData] = useState([
    { label: 'Web', value: 45, color: 'bg-blue-500' },
    { label: 'Mobile', value: 30, color: 'bg-green-500' },
    { label: 'API', value: 15, color: 'bg-purple-500' },
    { label: 'Other', value: 10, color: 'bg-orange-500' }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toasts, success, removeToast } = useToast();

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Total Revenue' 
          ? `$${Math.floor(Math.random() * 50000 + 100000).toLocaleString()}`
          : metric.title === 'Active Users'
          ? `${Math.floor(Math.random() * 2000 + 7000).toLocaleString()}`
          : metric.value
      })));
      success('Data refreshed successfully!');
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Performance'
          ? `${Math.floor(Math.random() * 30 + 80)} ms`
          : metric.value
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user}</h1>
            <p className="text-gray-300">Here's what's happening with your business today</p>
          </div>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`${metric.bgColor} p-4 rounded-xl`}>
                <div className={`bg-gradient-to-br ${metric.color} p-2 rounded-lg text-white`}>
                  {metric.icon}
                </div>
              </div>
              <span className="text-green-500 text-sm font-semibold">{metric.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
            <BarChart className="w-6 h-6 text-gray-500" />
          </div>
          <div className="h-80 p-4">
            <div className="h-full flex items-end justify-between gap-2">
              {revenueData.map((item, idx) => {
                const barHeight = (item.value / maxRevenue) * 100;
                const minHeight = 5; // Minimum height for visibility
                const actualHeight = Math.max(barHeight, minHeight);
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer h-full">
                    <div className="w-full flex flex-col items-end justify-end h-full relative">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 relative group-hover:opacity-90 group-hover:shadow-lg"
                        style={{ 
                          height: `${actualHeight}%`,
                          minHeight: `${minHeight}%`
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                          ${item.value.toLocaleString()}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 font-medium">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Distribution</h3>
            <PieChart className="w-6 h-6 text-gray-500" />
          </div>
          <div className="h-80 flex flex-col justify-center space-y-4">
            {distributionData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500 hover:opacity-80`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { title: 'New user registration', time: '2 hours ago', type: 'success' },
            { title: 'System maintenance completed', time: '4 hours ago', type: 'info' },
            { title: 'Revenue milestone reached', time: '1 day ago', type: 'success' },
            { title: 'New API integration deployed', time: '2 days ago', type: 'info' }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
