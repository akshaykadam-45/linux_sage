
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CommandInput } from './components/CommandInput';
import { CommandDisplay } from './components/CommandDisplay';
import { explainCommand } from './services/geminiService';
import { CommandExplanation, HistoryItem } from './types';
// Added Terminal to the imports from lucide-react
import { BookOpen, History, Trash2, Cpu, Zap, Shield, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<CommandExplanation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage
  useEffect(() => {
    const stored = localStorage.getItem('ls_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const handleSearch = async (command: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await explainCommand(command);
      setExplanation(result);
      
      // Update history
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(7),
        command: result.command,
        timestamp: Date.now(),
      };
      
      const updatedHistory = [newHistoryItem, ...history.filter(h => h.command !== result.command)].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('ls_history', JSON.stringify(updatedHistory));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setExplanation(null);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ls_history');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Master the <span className="text-emerald-400">Terminal.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl">
          Decoding Linux commands for humans. Simple, structured, and beginner-friendly insights.
        </p>
      </div>

      <CommandInput onSearch={handleSearch} isLoading={loading} />

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {explanation ? (
            <CommandDisplay data={explanation} />
          ) : !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Cpu className="w-6 h-6" />}
                title="AI Powered"
                description="Get detailed insights generated specifically for your query."
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6" />}
                title="Simple Explanations"
                description="Complex man-pages transformed into plain English."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6" />}
                title="Safety First"
                description="Automated warnings for potentially destructive commands."
              />
            </div>
          )}
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-500 font-medium animate-pulse">Consulting the oracle...</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 space-y-8">
          {history.length > 0 && (
            <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                  <History className="w-4 h-4" />
                  History
                </div>
                <button 
                  onClick={clearHistory}
                  className="p-1 hover:bg-rose-500/10 hover:text-rose-400 text-slate-500 transition-colors rounded"
                  title="Clear history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearch(item.command)}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all mono"
                  >
                    {item.command}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              Basics Guide
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Flags (options) start with - or --
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Most commands act on files or directories
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Use 'sudo' to run as administrator
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-all group">
    <div className="bg-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-slate-100 mb-2">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default App;
