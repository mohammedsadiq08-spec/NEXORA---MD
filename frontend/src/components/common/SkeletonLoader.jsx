import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-3 w-24 bg-slate-800 rounded"></div>
        <div className="h-8 w-8 bg-slate-800 rounded-xl"></div>
      </div>
      <div className="h-8 w-16 bg-slate-700/80 rounded mb-4"></div>
      <div className="h-3 w-full bg-slate-800/50 rounded"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-4 overflow-hidden animate-pulse">
      <div className="h-10 bg-slate-800/60 rounded-xl mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-14 bg-slate-800/30 rounded-xl flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-700"></div>
              <div className="space-y-1">
                <div className="h-3.5 w-28 bg-slate-700 rounded"></div>
                <div className="h-2.5 w-16 bg-slate-800 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-20 bg-slate-800 rounded hidden md:block"></div>
            <div className="h-4 w-12 bg-slate-800 rounded"></div>
            <div className="h-6 w-16 bg-slate-800 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
