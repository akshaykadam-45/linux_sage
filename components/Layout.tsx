
import React from 'react';
import { Terminal, Github, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Terminal className="text-emerald-400 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Linux Sage
            </h1>
          </div>
          <nav className="flex gap-6 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-800 py-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Built for Linux beginners. Powered by Gemini AI. 
            <br />
            Always use terminal commands responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
};
