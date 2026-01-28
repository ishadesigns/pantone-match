import { PantoneColor, ThemePreset } from './types';
import floralBack from './images/floral.png';
import coffeeBack from './images/coffee.png';
import mountainBack from './images/mountain.png';

export const PRESET_THEMES: Record<string, ThemePreset> = {
  'floral': {
    name: 'Floral',
    vibe: 'Soft petals, spring light, and botanical pastels — delicate, airy, and romantic.',
    cardBackImage: floralBack,
    palette: [
      { hex: '#F6B7C9', name: 'Peony Blush', code: '13-1520' },
      { hex: '#F9D6C5', name: 'Apricot Bloom', code: '13-1404' },
      { hex: '#F6E2A9', name: 'Butter Blossom', code: '12-0615' },
      { hex: '#C9DFA2', name: 'Sprout Sage', code: '13-0524' },
      { hex: '#B8D6F3', name: 'Morning Sky', code: '13-4308' },
      { hex: '#C9B7F0', name: 'Lilac Whisper', code: '14-3207' },
      { hex: '#F4A7A0', name: 'Rose Quartz', code: '13-1511' },
      { hex: '#F3F0EA', name: 'Petal Cream', code: '11-0107' }
    ]
  },
  'coffee': {
    name: 'Coffee',
    vibe: 'Roasted warmth, crema softness, and spice notes — rich, cozy, and grounded.',
    cardBackImage: coffeeBack,
    palette: [
      { hex: '#4B2E20', name: 'Espresso Roast', code: '19-1218' },
      { hex: '#7B4B2A', name: 'Mocha Bean', code: '18-1029' },
      { hex: '#A47149', name: 'Caramel Drip', code: '17-1145' },
      { hex: '#C8A27D', name: 'Latte Foam', code: '16-1320' },
      { hex: '#E8D6C5', name: 'Café Au Lait', code: '13-1014' },
      { hex: '#D9B48F', name: 'Biscotti Crumb', code: '14-1213' },
      { hex: '#B98A6B', name: 'Cinnamon Steam', code: '16-1342' },
      { hex: '#6B4B3E', name: 'French Press', code: '18-1418' }
    ]
  },
  'mountain': {
    name: 'Mountain',
    vibe: 'Alpine air, granite shadow, pine depth — crisp, rugged, and expansive.',
    cardBackImage: mountainBack,
    palette: [
      { hex: '#2F3E46', name: 'Basalt Ridge', code: '19-4014' },
      { hex: '#52796F', name: 'Evergreen Trail', code: '18-5720' },
      { hex: '#84A98C', name: 'Meadow Mist', code: '15-6310' },
      { hex: '#CAD2C5', name: 'Glacier Fog', code: '13-4304' },
      { hex: '#8D99AE', name: 'Stone Sky', code: '16-4006' },
      { hex: '#4A6FA5', name: 'Summit Blue', code: '18-4031' },
      { hex: '#BFC0C0', name: 'Granite Light', code: '14-4203' },
      { hex: '#E8EAED', name: 'Snow Cap', code: '11-4101' }
    ]
  }
};

export const CARD_FLIP_DELAY = 1000;
export const PREVIEW_TIME = 2000;
