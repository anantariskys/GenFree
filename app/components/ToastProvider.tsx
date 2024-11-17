import React, { createContext, useContext, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';

// Create context for the toast
const ToastContext = createContext({
  showToast: (message: string, type?: 'success' | 'error' | 'info') => {},
});

// Toast item interface
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Get icon based on toast type
const getToastIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'material-symbols:check-circle';
    case 'error':
      return 'material-symbols:error';
    case 'info':
      return 'material-symbols:info';
    default:
      return 'material-symbols:info';
  }
};

// Provider component
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              animate-slide-up rounded-lg px-4 py-3 shadow-lg transition-all duration-300 max-w-xs
              flex items-center gap-2
              ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
              ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
            `}
            role="alert"
            onClick={() => {
              setToasts(prev => prev.filter(t => t.id !== toast.id));
            }}
          >
            <Icon 
              icon={getToastIcon(toast.type)} 
              className="text-xl flex-shrink-0"
            />
            <p className="text-sm font-medium">{toast.message}</p>
            <Icon 
              icon="material-symbols:close" 
              className="text-xl ml-auto cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                setToasts(prev => prev.filter(t => t.id !== toast.id));
              }}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;