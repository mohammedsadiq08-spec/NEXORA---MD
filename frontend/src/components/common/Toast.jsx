import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStudents } from '../../context/StudentContext';

export default function Toast() {
  const { toasts, removeToast } = useStudents();

  if (!toasts || toasts.length === 0) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-500/30',
      bg: 'bg-[#0B1522]/95',
      iconColor: 'text-emerald-400',
      titleColor: 'text-emerald-300'
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-500/30',
      bg: 'bg-[#1D0F1A]/95',
      iconColor: 'text-rose-400',
      titleColor: 'text-rose-300'
    },
    info: {
      icon: Info,
      border: 'border-blue-500/30',
      bg: 'bg-[#0A1224]/95',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-300'
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const config = typeConfig[toast.type] || typeConfig.info;
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${config.border} ${config.bg} shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-5`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
            <div className="flex-1 pr-2">
              <h4 className={`text-sm font-semibold ${config.titleColor}`}>
                {toast.title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
