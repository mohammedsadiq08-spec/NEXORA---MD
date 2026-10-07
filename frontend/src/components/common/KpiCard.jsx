import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  icon: Icon,
  variant = 'blue', // 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan'
  className = '',
  onClick
}) {
  const colorStyles = {
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'hover:shadow-blue-500/10',
      accent: 'text-blue-400'
    },
    violet: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'hover:shadow-purple-500/10',
      accent: 'text-purple-400'
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'hover:shadow-emerald-500/10',
      accent: 'text-emerald-400'
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'hover:shadow-amber-500/10',
      accent: 'text-amber-400'
    },
    rose: {
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'hover:shadow-rose-500/10',
      accent: 'text-rose-400'
    },
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'hover:shadow-cyan-500/10',
      accent: 'text-cyan-400'
    }
  };

  const style = colorStyles[variant] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`relative group bg-[#0F172A]/70 backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border} ${style.glow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Top row: Title and Icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Main KPI Value */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
          {value}
        </span>
      </div>

      {/* Bottom row: Trend & Subtitle */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
        {subtitle && (
          <span className="text-xs text-slate-400 font-medium truncate">
            {subtitle}
          </span>
        )}

        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
            trendType === 'up'
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : trendType === 'down'
              ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              : 'text-slate-400 bg-slate-500/10 border border-slate-500/20'
          }`}>
            {trendType === 'up' && <TrendingUp className="w-3 h-3" />}
            {trendType === 'down' && <TrendingDown className="w-3 h-3" />}
            {trendType === 'neutral' && <Minus className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
