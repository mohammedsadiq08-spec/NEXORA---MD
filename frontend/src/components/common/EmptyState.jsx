import React from 'react';
import { SearchX, Users, FilterX, BarChart2 } from 'lucide-react';

export default function EmptyState({
  title = "No data found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon: Icon = SearchX,
  actionText,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-[#0B0F19]/50 my-6">
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 shadow-inner">
        <Icon className="w-8 h-8 animate-pulse" />
      </div>
      <h4 className="text-lg font-bold text-white mb-1">
        {title}
      </h4>
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-500/20"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
