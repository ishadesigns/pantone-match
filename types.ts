export interface PantoneColor {
  hex: string;
  name: string;
  code: string;
}

export interface CardItem extends PantoneColor {
  id: string; // Unique ID for the game instance (since there are pairs)
  pairId: string; // ID linking the pair (e.g., the color code)
  isFlipped: boolean;
  isMatched: boolean;
}

export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOADING_THEME = 'LOADING_THEME'
}

export interface GameStats {
  moves: number;
  matches: number;
  timeElapsed: number;
}

export interface ThemePreset {
  name: string;
  vibe: string;
  palette: PantoneColor[];
  cardBackImage: string;
}