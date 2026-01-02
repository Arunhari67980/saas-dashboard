import { AlertCircle, Check, X, Info } from 'lucide-react';
import { useState } from 'react';

export const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'success', title: 'Success', message: 'Your changes have been saved successfully.', visible: true },
    { id: 2, type: 'error', title: 'Error', message: 'Something went wrong. Please try again.', visible: true },
    { id: 3, type: 'warning', title: 'Warning', message: 'Your subscription will expire in 7 days.', visible: true },
    { id: 4, type: 'info', title: 'Info', message: 'A new update is available. Please refresh to get the latest version.', visible: true },
  ]);

  const removeAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, visible: false } : a));
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
      default:
        return '';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'warning':
      case 'info':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Alerts & Notifications</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          alert.visible && (
            <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl border ${getAlertStyles(alert.type)}`}>
              <div className="shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{alert.title}</h3>
                <p className="text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
