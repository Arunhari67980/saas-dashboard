import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg animate-fadeIn ${styles[toast.type] || styles.info} min-w-[300px] max-w-md`}>
      <div className="shrink-0">
        {icons[toast.type] || icons.info}
      </div>
      <div className="flex-1">
        {toast.title && <h4 className="font-semibold mb-1">{toast.title}</h4>}
        <p className="text-sm">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

