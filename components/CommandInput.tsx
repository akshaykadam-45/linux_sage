
import React, { useState } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';

interface CommandInputProps {
  onSearch: (command: string) => void;
  isLoading: boolean;
}

export const CommandInput: React.FC<CommandInputProps> = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto mb-12">
      <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-focus-within:bg-emerald-500/30 transition-all rounded-2xl" />
      <div className="relative flex items-center bg-slate-800/80 border border-slate-700 rounded-2xl p-1 transition-all focus-within:border-emerald-500/50 backdrop-blur-sm">
        <div className="pl-4 pr-2 text-slate-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a command (e.g., ls, grep, chmod)..."
          className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-slate-100 placeholder:text-slate-500 mono"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold p-3 rounded-xl transition-all flex items-center justify-center mr-1"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center text-xs text-slate-500 font-medium">
        <span>Try:</span>
        <button type="button" onClick={() => { setValue('grep'); onSearch('grep'); }} className="hover:text-emerald-400 hover:underline">grep</button>
        <button type="button" onClick={() => { setValue('chmod'); onSearch('chmod'); }} className="hover:text-emerald-400 hover:underline">chmod</button>
        <button type="button" onClick={() => { setValue('find'); onSearch('find'); }} className="hover:text-emerald-400 hover:underline">find</button>
        <button type="button" onClick={() => { setValue('tar'); onSearch('tar'); }} className="hover:text-emerald-400 hover:underline">tar</button>
      </div>
    </form>
  );
};
