import React from 'react';
import { CardItem } from '../types';

interface CardProps {
  card: CardItem;
  onClick: (card: CardItem) => void;
  disabled: boolean;
  backImage: string;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled, backImage }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div 
      className={`relative w-full aspect-[2/3] perspective-1000 cursor-pointer group select-none transition-transform duration-300 hover:-translate-y-2`}
      onClick={handleClick}
    >
      <div 
        className={`w-full h-full relative transform-style-3d transition-transform duration-500 shadow-xl group-hover:shadow-2xl ${card.isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Back of Card (Face Down) */}
        <div className="absolute inset-0 backface-hidden bg-white border border-zinc-200 overflow-hidden rounded-sm">
          <img 
            src={backImage} 
            alt="Card Back" 
            className="w-full h-full object-cover" 
            draggable={false}
          />
        </div>

        {/* Front of Card (Face Up) */}
        <div 
          className="absolute inset-0 backface-hidden rotate-y-180 bg-white flex flex-col"
          style={{ 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
          }}
        >
          {/* Color Block (Top 65%) */}
          <div 
            className="w-full h-[65%]" 
            style={{ backgroundColor: card.hex }}
          />
          
          {/* Text Area (Bottom 35%) */}
          <div className="w-full h-[35%] p-3 flex flex-col justify-start text-left bg-white">
            <div className="font-bold text-zinc-900 text-[clamp(10px,2.5vw,14px)] leading-tight">
              {card.code}
            </div>
            <div className="text-zinc-900 text-[clamp(10px,2.5vw,14px)] font-medium mt-1 leading-tight">
              {card.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;