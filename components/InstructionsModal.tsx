import React from 'react';
import { X, Play } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm md:max-w-md p-6 md:p-8 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300 border border-zinc-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">How to Play</h2>
          <p className="text-zinc-500 text-sm">Match the colors to complete the palette.</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mt-0.5">1</span>
            <p className="text-sm text-zinc-700 font-medium pt-0.5">Click any card to reveal its Pantone color code.</p>
          </div>
          
          <div className="flex items-start gap-4 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
             <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mt-0.5">2</span>
            <p className="text-sm text-zinc-700 font-medium pt-0.5">Find the matching card with the same color and name.</p>
          </div>
          
          <div className="flex items-start gap-4 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
             <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mt-0.5">3</span>
            <p className="text-sm text-zinc-700 font-medium pt-0.5">Clear the board in the fewest moves to win!</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
        >
          <Play size={18} className="fill-current" />
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;