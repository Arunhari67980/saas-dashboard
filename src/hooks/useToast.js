import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      autoClose: true,
      duration: 3000,
      ...toast
    };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message, title = 'Success') => {
    return showToast({ type: 'success', message, title });
  }, [showToast]);

  const error = useCallback((message, title = 'Error') => {
    return showToast({ type: 'error', message, title });
  }, [showToast]);

  const warning = useCallback((message, title = 'Warning') => {
    return showToast({ type: 'warning', message, title });
  }, [showToast]);

  const info = useCallback((message, title = 'Info') => {
    return showToast({ type: 'info', message, title });
  }, [showToast]);

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};

