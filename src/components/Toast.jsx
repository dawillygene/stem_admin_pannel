import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Allow animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Configure toast based on type
  const toastConfig = {
    success: { 
      icon: 'fas fa-check-circle text-green-500', 
      border: 'border-green-500' 
    },
    error: { 
      icon: 'fas fa-exclamation-circle text-red-500', 
      border: 'border-red-500' 
    },
    info: { 
      icon: 'fas fa-info-circle text-blue-500', 
      border: 'border-blue-500' 
    },
    warning: { 
      icon: 'fas fa-exclamation-triangle text-yellow-500', 
      border: 'border-yellow-500' 
    }
  };

  const config = toastConfig[type] || toastConfig.info;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className={`bg-white rounded-lg shadow-lg border-l-4 ${config.border} p-4 max-w-sm`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className={config.icon}></i>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button 
              onClick={() => {
                setIsVisible(false);
                if (onClose) setTimeout(onClose, 300);
              }} 
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast context for global usage
export const ToastContext = React.createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return React.useContext(ToastContext);
};

export default Toast;