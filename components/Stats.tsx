import React from 'react';
import { Clock, MousePointer2, Trophy } from 'lucide-react';

interface StatsProps {
  moves: number;
  timeElapsed: number;
  bestScore?: { moves: number; time: number } | null;
}

const Stats: React.FC<StatsProps> = ({ moves, timeElapsed, bestScore }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 mt-4 text-zinc-600 font-medium text-sm md:text-base">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <MousePointer2 size={18} className="text-zinc-400" />
          <span><span className="text-zinc-900 font-semibold">{moves}</span> Moves</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-zinc-400" />
          <span>{formatTime(timeElapsed)}</span>
        </div>
      </div>
      
      {bestScore && (
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs md:text-sm">
          <Trophy size={14} />
          <span>
            Best: <strong>{bestScore.moves}</strong> moves 
            <span className="opacity-75 ml-1">({formatTime(bestScore.time)})</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Stats;