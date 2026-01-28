import React, { useState, useEffect } from 'react';
import { GameState } from '../types';
import { RefreshCcw, ChevronDown, Palette, HelpCircle, Lightbulb } from 'lucide-react';
import { PRESET_THEMES } from '../constants';

interface ControlsProps {
  gameState: GameState;
  onReset: () => void;
  onThemeSelect: (key: string) => void;
  onOpenHelp: () => void;
  currentThemeKey: string;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onGenerateTheme: (theme: string) => void;
  customThemeLabel?: string | null;
  showGeminiPanel: boolean;
}

const TIPS = [
  "Match Pantone codes (e.g., 17-2031) for extra precision.",
  "Clear the board in fewer moves to beat your high score.",
  "Focus on the unique names to help recall card positions.",
  "Take your time! Accuracy beats speed in this memory game.",
  "Look for subtle shade differences in the lighter palettes.",
  "Try the Mountain theme for crisp, high-contrast cues."
];

const Controls: React.FC<ControlsProps> = ({ 
  gameState, 
  onReset, 
  onThemeSelect, 
  onOpenHelp,
  currentThemeKey,
  apiKey,
  onApiKeyChange,
  onGenerateTheme,
  customThemeLabel,
  showGeminiPanel,
}) => {
  const [tip, setTip] = useState("");
  const [customTheme, setCustomTheme] = useState("");

  useEffect(() => {
    // Select a random tip on mount
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeSelect(e.target.value);
  };

  const isLoading = gameState === GameState.LOADING_THEME;
  const hasCustomTheme = Boolean(customThemeLabel);
  const canGenerate = customTheme.trim().length > 0 && apiKey.trim().length > 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          className="flex items-center justify-center w-11 h-11 bg-white border border-zinc-200 text-zinc-400 rounded-full hover:border-zinc-300 hover:text-zinc-900 transition-colors shadow-sm"
          title="How to Play"
          aria-label="How to Play"
        >
          <HelpCircle size={20} />
        </button>

        {/* Theme Selector Dropdown (Highlighted Primary) */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Palette size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <select
            value={currentThemeKey}
            onChange={handleSelectChange}
            disabled={isLoading}
            className="appearance-none pl-11 pr-10 py-3 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 cursor-pointer min-w-[220px] shadow-md transition-all"
          >
            {hasCustomTheme && (
              <option value="custom">{customThemeLabel}</option>
            )}
            {Object.entries(PRESET_THEMES).map(([key, data]) => (
              <option key={key} value={key}>
                {data.name} Theme
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <ChevronDown size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Reset Button (Secondary Style) */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 font-medium rounded-full hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all shadow-sm min-w-[140px] justify-center"
          disabled={isLoading}
        >
          <RefreshCcw size={16} />
          {gameState === GameState.WON ? 'Play Again' : 'Reset Board'}
        </button>
      </div>

      {showGeminiPanel && (
        <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <label className="flex-1 text-sm text-zinc-700">
              Gemini API Key (stored in your browser)
              <input
                type="password"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Paste your Gemini API key here"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                autoComplete="off"
              />
            </label>
            <label className="flex-1 text-sm text-zinc-700">
              Custom theme prompt
              <input
                type="text"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="e.g., Desert Mirage, Retro Futurism"
                className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </label>
            <button
              onClick={() => onGenerateTheme(customTheme)}
              disabled={!canGenerate || isLoading}
              className="flex items-center justify-center h-11 px-5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate Palette"}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Your key stays in this browser and is only used to call Gemini when you generate a custom palette.
          </p>
        </div>
      )}
      
      {/* Game Tip Section (Replaces Vibe) */}
      <div className="w-full max-w-xl bg-blue-50/50 border border-blue-100 rounded-xl p-4 shadow-sm flex items-start gap-3">
        <div className="bg-white p-1.5 rounded-full shadow-sm text-blue-500 mt-0.5">
           <Lightbulb size={16} className="fill-current" />
        </div>
        <div>
          <strong className="text-blue-900 text-xs uppercase tracking-wider block mb-1">Game Tip</strong>
          <p className="text-sm text-blue-800/80 leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default Controls;
