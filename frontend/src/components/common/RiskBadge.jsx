import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';

export default function RiskBadge({ level, size = 'default' }) {
  const sizeClasses = {
    small: 'text-[10px] px-2 py-0.5',
    default: 'text-xs px-2.5 py-1',
    large: 'text-sm px-3.5 py-1.5'
  };

  const riskConfig = {
    'Critical': {
      bg: 'bg-rose-500/15 border-rose-500/40 text-rose-400 font-semibold',
      icon: ShieldAlert,
      glow: 'shadow-sm shadow-rose-500/20'
    },
    'High': {
      bg: 'bg-amber-500/15 border-amber-500/40 text-amber-400 font-semibold',
      icon: AlertTriangle,
      glow: 'shadow-sm shadow-amber-500/20'
    },
    'Moderate': {
      bg: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 font-medium',
      icon: AlertCircle,
      glow: ''
    },
    'Safe': {
      bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-medium',
      icon: ShieldCheck,
      glow: ''
    }
  };

  const config = riskConfig[level] || riskConfig['Moderate'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border backdrop-blur-sm ${config.bg} ${config.glow} ${sizeClasses[size] || sizeClasses.default}`}>
      <Icon className={size === 'small' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{level}</span>
    </span>
  );
}
