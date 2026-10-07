import React from 'react';

export default function NexoraLogo({ size = 'default', showText = true, className = '' }) {
  const iconSizes = {
    small: 'w-7 h-7',
    default: 'w-9 h-9',
    large: 'w-12 h-12',
    hero: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl font-extrabold',
    hero: 'text-4xl font-extrabold tracking-tight'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric Abstract N with connected nodes */}
      <div className={`relative flex items-center justify-center ${iconSizes[size] || iconSizes.default} rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300`}>
        <div className="w-full h-full bg-[#070913]/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle grid in logo */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-30"></div>
          
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
            {/* Left pillar */}
            <path d="M10 32V8" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Diagonal data connector */}
            <path d="M10 10L30 30" stroke="url(#logo-grad)" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Right pillar */}
            <path d="M30 32V8" stroke="#A855F7" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Data nodes */}
            <circle cx="10" cy="10" r="3" fill="#38BDF8" className="animate-pulse" />
            <circle cx="20" cy="20" r="2.5" fill="#60A5FA" />
            <circle cx="30" cy="30" r="3" fill="#C084FC" className="animate-pulse" />
            
            <defs>
              <linearGradient id="logo-grad" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 ${textSizes[size] || textSizes.default}`}>
              NEXORA
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          {size === 'large' || size === 'hero' ? (
            <span className="text-[11px] font-medium tracking-widest uppercase text-blue-400/80">
              Student Intelligence
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
