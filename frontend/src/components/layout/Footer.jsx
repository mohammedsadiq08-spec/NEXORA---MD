import React from 'react';
import NexoraLogo from '../common/NexoraLogo';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#080C16] px-6 py-6 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <NexoraLogo size="small" showText={false} />
          <div>
            <span className="font-bold text-slate-200">NEXORA</span>
            <span className="text-slate-400 ml-2">Next-Generation Student Performance Analytics System</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-400 font-mono font-medium">
            PYTHON • NUMPY • PANDAS
          </span>
          <span>© 2026 NEXORA Analytics. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
