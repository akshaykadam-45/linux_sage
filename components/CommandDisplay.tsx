
import React from 'react';
import { AlertTriangle, Terminal, Code, Info, ChevronRight, Check, Layers, XCircle, Wand2 } from 'lucide-react';
import { CommandExplanation } from '../types';

interface CommandDisplayProps {
  data: CommandExplanation;
}

export const CommandDisplay: React.FC<CommandDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 flex-1 w-full">
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
              data.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
              data.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
              'bg-rose-500/20 text-rose-400'
            }`}>
              {data.difficulty}
            </span>
          </div>
          <h2 className="text-4xl font-black mb-2 mono text-slate-100">{data.command}</h2>
          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            {data.summary}
          </p>
        </div>

        {data.safetyWarning && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 md:w-80 shrink-0 w-full">
            <div className="flex items-center gap-2 text-rose-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold text-sm uppercase">Safety Warning</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {data.safetyWarning}
            </p>
          </div>
        )}
      </div>

      {/* Syntax Error Section */}
      {data.syntaxError?.isError && (
        <section className="bg-rose-500/5 border border-rose-500/30 rounded-2xl p-6 shadow-lg shadow-rose-500/5">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <XCircle className="w-6 h-6" />
            <h3 className="font-bold text-lg">Syntax Error Detected</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-300 mb-2 font-medium">What's wrong:</p>
              <p className="text-rose-300 text-sm mono">
                {data.syntaxError.location && <span className="underline decoration-rose-500 decoration-2 mr-2">{data.syntaxError.location}</span>}
                {data.syntaxError.reason}
              </p>
            </div>
            {data.syntaxError.correction && (
              <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Wand2 className="w-4 h-4" />
                  <p className="text-sm font-bold uppercase tracking-wider">Suggested Correction:</p>
                </div>
                <p className="text-emerald-300 mono text-sm font-bold">
                  {data.syntaxError.correction}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Specific Breakdown Section */}
      {data.inputBreakdown && data.inputBreakdown.length > 0 && (
        <section className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 shadow-lg shadow-emerald-500/5">
          <div className="flex items-center gap-2 mb-6 text-emerald-400">
            <Layers className="w-5 h-5" />
            <h3 className="font-bold text-lg">Breakdown of your input:</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {data.inputBreakdown.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 min-w-[120px] group">
                <div className="mono bg-slate-800 text-emerald-300 px-3 py-2 rounded-lg border border-slate-700 group-hover:border-emerald-500/50 transition-colors text-center font-bold break-all">
                  {item.part}
                </div>
                <div className="text-[11px] text-slate-500 uppercase font-bold text-center tracking-tighter mt-1">
                  Purpose
                </div>
                <div className="text-sm text-slate-300 bg-slate-800/30 p-2 rounded-lg text-center leading-tight min-h-[40px] flex items-center justify-center">
                  {item.meaning}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Description & Syntax */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Info className="w-5 h-5" />
            <h3 className="font-bold text-lg">Detailed Explanation</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {data.detailedDescription}
          </p>
        </section>

        <section className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Terminal className="w-5 h-5" />
            <h3 className="font-bold text-lg">General Usage Pattern</h3>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 font-mono text-emerald-400 break-all">
            {data.synopsis}
          </div>
        </section>
      </div>

      {/* Flags */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6 text-emerald-400">
          <ChevronRight className="w-5 h-5" />
          <h3 className="font-bold text-lg">Useful Options (Flags)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.flags.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <span className="mono text-emerald-400 font-bold">{item.flag}</span>
              <span className="text-sm text-slate-400">{item.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section>
        <div className="flex items-center gap-2 mb-6 text-emerald-400">
          <Code className="w-5 h-5" />
          <h3 className="font-bold text-lg">Correct Practice Examples</h3>
        </div>
        <div className="space-y-4">
          {data.examples.map((ex, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Example {i + 1}</span>
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="p-6">
                <div className="mono text-emerald-300 mb-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap">
                  <span className="text-slate-600 mr-2">$</span>
                  {ex.code}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <span className="text-emerald-400 font-bold mr-2">—</span>
                  {ex.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
