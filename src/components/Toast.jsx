import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed bottom-20 right-6 z-50 transition-all duration-300 ${visible ? 'toast-enter' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl max-w-sm">
        <CheckCircle size={18} className="text-ok shrink-0" />
        <p className="text-sm">{message}</p>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
