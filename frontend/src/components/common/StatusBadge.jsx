import React from 'react';
import { Award, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function StatusBadge({ status, showIcon = true, size = 'default' }) {
  const sizeClasses = {
    small: 'text-[10px] px-2 py-0.5',
    default: 'text-xs px-2.5 py-1',
    large: 'text-sm px-3 py-1.5'
  };

  const statusConfig = {
    'Excellent': {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      dot: 'bg-emerald-400',
      icon: Award
    },
    'Good': {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      dot: 'bg-blue-400',
      icon: CheckCircle
    },
    'Needs Improvement': {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      dot: 'bg-amber-400',
      icon: AlertTriangle
    },
    'At Risk': {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      dot: 'bg-rose-400',
      icon: AlertOctagon
    }
  };

  const config = statusConfig[status] || statusConfig['Good'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm ${config.bg} ${sizeClasses[size] || sizeClasses.default}`}>
      {showIcon ? (
        <Icon className={size === 'small' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      )}
      <span>{status}</span>
    </span>
  );
}
