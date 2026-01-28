import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CardItem, PantoneColor, GameState } from './types';
import { PRESET_THEMES, CARD_FLIP_DELAY } from './constants';
import Card from './components/Card';
import Controls from './components/Controls';
import Stats from './components/Stats';
import InstructionsModal from './components/InstructionsModal';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateThemePalette } from './services/geminiService';

interface PersonalBest {
  moves: number;
  time: number;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [customPalette, setCustomPalette] = useState<PantoneColor[] | null>(null);
  const [customThemeLabel, setCustomThemeLabel] = useState<string | null>(null);
  
  // Theme State - Default to 'retro'
  const [currentThemeKey, setCurrentThemeKey] = useState<string>('retro');
  const [bestScore, setBestScore] = useState<PersonalBest | null>(null);
  
  const timerRef = useRef<number | null>(null);

  // Load Instructions State on Mount
  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem('pantone_instructions_seen');
    if (!hasSeenInstructions) {
      setShowInstructions(true);
    }
  }, []);

  // Load saved Gemini API key (optional, user-provided for custom palettes).
  useEffect(() => {
    const savedKey = localStorage.getItem('pantone_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleOpenHelp = () => setShowInstructions(true);
  
  const handleCloseHelp = () => {
    setShowInstructions(false);
    localStorage.setItem('pantone_instructions_seen', 'true');
  };

  // Load Personal Best when theme changes
  useEffect(() => {
    const savedBest = localStorage.getItem(`pantone_best_${currentThemeKey}`);
    if (savedBest) {
      try {
        setBestScore(JSON.parse(savedBest));
      } catch (e) {
        console.error("Failed to parse best score", e);
      }
    } else {
      setBestScore(null);
    }
  }, [currentThemeKey]);

  // Initialize Game
  const initializeGame = useCallback((palette: PantoneColor[]) => {
    // Duplicate colors to create pairs
    const gamePairs: CardItem[] = [
      ...palette.map(color => ({ ...color, id: `${color.code}-1`, pairId: color.code, isFlipped: false, isMatched: false })),
      ...palette.map(color => ({ ...color, id: `${color.code}-2`, pairId: color.code, isFlipped: false, isMatched: false }))
    ];

    // Shuffle
    for (let i = gamePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gamePairs[i], gamePairs[j]] = [gamePairs[j], gamePairs[i]];
    }

    setCards(gamePairs);
    setGameState(GameState.PLAYING);
    setMoves(0);
    setTimeElapsed(0);
    setFlippedCards([]);
    
    // Clear existing timer if any
    if (timerRef.current) window.clearInterval(timerRef.current);
    
    // Start Timer
    timerRef.current = window.setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

  }, []);

  // Initial load
  useEffect(() => {
    initializeGame(PRESET_THEMES['retro'].palette);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [initializeGame]);

  // Check Win Condition & Update Best Score
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameState(GameState.WON);
      if (timerRef.current) window.clearInterval(timerRef.current);
      
      // Update Personal Best
      // Priority: Fewer moves, then faster time
      const currentStats = { moves, time: timeElapsed };
      let isNewBest = false;

      setBestScore(prevBest => {
        if (!prevBest) {
          isNewBest = true;
          return currentStats;
        }
        
        if (moves < prevBest.moves || (moves === prevBest.moves && timeElapsed < prevBest.time)) {
          isNewBest = true;
          return currentStats;
        }
        
        return prevBest;
      });

      if (isNewBest) {
        localStorage.setItem(`pantone_best_${currentThemeKey}`, JSON.stringify(currentStats));
      }

      // Trigger Confetti Celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF00CC', '#39FF14', '#00FFFF']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF00CC', '#39FF14', '#00FFFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]); // We only want this to run when card states change

  const handleCardClick = (clickedCard: CardItem) => {
    if (gameState !== GameState.PLAYING || flippedCards.length >= 2 || clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    // Flip the card
    const newCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // If we have 2 cards flipped, check for match
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // Match found
        setCards(prevCards => prevCards.map(card => 
          card.pairId === first.pairId ? { ...card, isMatched: true } : card
        ));
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => 
            card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, CARD_FLIP_DELAY);
      }
    }
  };

  const handleThemeSelect = (key: string) => {
    setCurrentThemeKey(key);
    
    // If it's a preset, load it immediately
    if (PRESET_THEMES[key]) {
      initializeGame(PRESET_THEMES[key].palette);
    } else if (key === 'custom' && customPalette) {
      initializeGame(customPalette);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    if (value.trim().length === 0) {
      localStorage.removeItem('pantone_gemini_api_key');
      return;
    }
    localStorage.setItem('pantone_gemini_api_key', value);
  };

  const handleGenerateTheme = async (theme: string) => {
    if (!theme.trim()) return;
    if (!apiKey.trim()) {
      alert('Please add your Gemini API key first.');
      return;
    }

    try {
      setGameState(GameState.LOADING_THEME);
      const palette = await generateThemePalette(theme.trim(), apiKey.trim());
      setCustomPalette(palette);
      setCustomThemeLabel(`Custom: ${theme.trim()}`);
      setCurrentThemeKey('custom');
      initializeGame(palette);
    } catch (error) {
      console.error('Failed to generate theme palette', error);
      alert('Theme generation failed. Double-check your API key and try again.');
      setGameState(GameState.PLAYING);
    }
  };

  const handleReset = () => {
    // If using a preset, reload from constants (which will reshuffle in initializeGame)
    if (PRESET_THEMES[currentThemeKey]) {
      initializeGame(PRESET_THEMES[currentThemeKey].palette);
    } 
    // Fallback
    else {
      initializeGame(PRESET_THEMES['retro'].palette);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-zinc-900 font-sans selection:bg-zinc-200">
      <header className="pt-12 pb-8 px-4 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Pantone Match</h1>
        <p className="text-zinc-500 mb-2 max-w-md mx-auto">
          Exercise your visual memory with iconic color chips.
        </p>
        
        <Stats moves={moves} timeElapsed={timeElapsed} bestScore={bestScore} />
      </header>

      <main className="container mx-auto px-4 pb-20 max-w-5xl">
        <Controls 
          gameState={gameState} 
          onReset={handleReset} 
          onThemeSelect={handleThemeSelect}
          onOpenHelp={handleOpenHelp}
          currentThemeKey={currentThemeKey}
          apiKey={apiKey}
          onApiKeyChange={handleApiKeyChange}
          onGenerateTheme={handleGenerateTheme}
          customThemeLabel={customThemeLabel}
        />

        {gameState === GameState.LOADING_THEME ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 animate-pulse">
            <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-medium">Mixing colors...</p>
          </div>
        ) : (
            <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                {cards.map(card => (
                    <Card 
                    key={card.id} 
                    card={card} 
                    onClick={handleCardClick} 
                    disabled={gameState !== GameState.PLAYING}
                    backImage={(PRESET_THEMES[currentThemeKey] || PRESET_THEMES['retro']).cardBackImage}
                    />
                ))}
                </div>

                {gameState === GameState.WON && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
                        <div className="bg-white p-8 md:p-12 shadow-2xl max-w-md w-full text-center relative">
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-full p-4 shadow-xl">
                                <Check size={48} className="text-green-500" strokeWidth={3} />
                             </div>
                             <h2 className="text-3xl font-bold mb-4 mt-6">Palette Complete!</h2>
                             <p className="text-zinc-600 mb-8">
                                 You matched all colors in <strong className="text-zinc-900">{moves} moves</strong> and <strong className="text-zinc-900">{timeElapsed} seconds</strong>.
                             </p>
                             <button 
                                 onClick={handleReset}
                                 className="w-full py-3 bg-zinc-900 text-white font-bold tracking-wide hover:bg-zinc-800 transition-colors"
                             >
                                 PLAY AGAIN
                             </button>
                        </div>
                    </div>
                )}
            </>
        )}
      </main>

      {showInstructions && (
        <InstructionsModal onClose={handleCloseHelp} />
      )}
    </div>
  );
};

export default App;
