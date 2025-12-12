import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-dark/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-card p-2 rounded-lg border border-white/10">
            <LogoIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Coach Gemini</h1>
            <p className="text-xs text-slate-400 font-medium">AI Biomechanics Expert</p>
          </div>
        </div>
        <div className="hidden sm:block">
           <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold border border-brand-accent/20">
             V 1.0
           </span>
        </div>
      </div>
    </header>
  );
};

export default Header;