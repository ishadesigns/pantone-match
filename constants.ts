import { PantoneColor, ThemePreset } from './types';

// SVG Data URIs for card backs with cool, unique artistic themes

// 1. Retro: Synthwave Sunset
const RETRO_BG = "data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23240046'/%3E%3Cstop offset='1' stop-color='%237a007a'/%3E%3C/linearGradient%3E%3ClinearGradient id='sun' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffcc00'/%3E%3Cstop offset='1' stop-color='%23ff0066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='600' fill='url(%23sky)'/%3E%3C!-- Sun --%3E%3Ccircle cx='200' cy='240' r='110' fill='url(%23sun)'/%3E%3Crect x='0' y='260' width='400' height='10' fill='%23500050' opacity='0.5'/%3E%3Crect x='0' y='290' width='400' height='15' fill='%23400040' opacity='0.6'/%3E%3Crect x='0' y='320' width='400' height='20' fill='%23300030' opacity='0.7'/%3E%3C!-- Landscape --%3E%3Crect x='0' y='350' width='400' height='250' fill='%231a0b2e'/%3E%3C!-- Grid --%3E%3Cpath d='M-100 600 L200 350 L500 600' fill='none' stroke='%2300ffcc' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M-300 600 L200 350 L700 600' fill='none' stroke='%2300ffcc' stroke-width='2' opacity='0.8'/%3E%3Cpath d='M200 350 L200 600' fill='none' stroke='%2300ffcc' stroke-width='2' opacity='0.8'/%3E%3Cline x1='0' y1='600' x2='400' y2='600' stroke='%2300ffcc' stroke-width='2'/%3E%3Cline x1='0' y1='540' x2='400' y2='540' stroke='%2300ffcc' stroke-width='2' opacity='0.6'/%3E%3Cline x1='0' y1='480' x2='400' y2='480' stroke='%2300ffcc' stroke-width='2' opacity='0.4'/%3E%3Cline x1='0' y1='420' x2='400' y2='420' stroke='%2300ffcc' stroke-width='2' opacity='0.2'/%3E%3Ctext x='200' y='120' font-family='sans-serif' font-weight='bold' font-size='24' fill='%23ff00cc' text-anchor='middle' letter-spacing='4' style='text-shadow: 2px 2px 0px %2300ffff;'%3ERETRO_WAVE%3C/text%3E%3C/svg%3E";

// 2. Cyberpunk: Neural Core
const CYBER_BG = "data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='600' fill='%23050505'/%3E%3Cdefs%3E%3Cpattern id='hex' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='scale(2)'%3E%3Cpath d='M20 0 L37 10 L37 30 L20 40 L3 30 L3 10 Z' fill='none' stroke='%23111' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='400' height='600' fill='url(%23hex)'/%3E%3C!-- Glow Lines --%3E%3Cpath d='M200 100 L200 500' stroke='%2300ff9d' stroke-width='2' stroke-dasharray='10 20' opacity='0.5'/%3E%3Cpath d='M50 300 L350 300' stroke='%2300ff9d' stroke-width='2' stroke-dasharray='10 20' opacity='0.5'/%3E%3C!-- Central Core --%3E%3Ccircle cx='200' cy='300' r='90' fill='black' stroke='%23d946ef' stroke-width='2'/%3E%3Ccircle cx='200' cy='300' r='70' fill='none' stroke='%2300ffff' stroke-width='4' stroke-dasharray='40 20'/%3E%3Ccircle cx='200' cy='300' r='40' fill='none' stroke='%2300ff9d' stroke-width='2'/%3E%3Ccircle cx='200' cy='300' r='10' fill='%23fff'/%3E%3C!-- HUD Elements --%3E%3Cpath d='M140 300 L120 340' stroke='%23d946ef' stroke-width='2'/%3E%3Crect x='100' y='340' width='40' height='10' fill='%23d946ef'/%3E%3Ctext x='200' y='540' font-family='monospace' fill='%2300ff9d' text-anchor='middle' font-size='16' letter-spacing='3' opacity='0.8'%3ELINK_ESTABLISHED%3C/text%3E%3C/svg%3E";

// 3. Enterprise: Isometric Structure
const ENT_BG = "data:image/svg+xml,%3Csvg width='400' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='600' fill='%231e293b'/%3E%3Cg transform='translate(200, 320)'%3E%3C!-- Bottom Block --%3E%3Cpath d='M0 -120 L100 -60 L0 0 L-100 -60 Z' fill='%23334155' stroke='%23475569' stroke-width='2'/%3E%3Cpath d='M-100 -60 L0 0 L0 120 L-100 60 Z' fill='%231e293b' stroke='%23475569' stroke-width='2'/%3E%3Cpath d='M100 -60 L100 60 L0 120 L0 0 Z' fill='%230f172a' stroke='%23475569' stroke-width='2'/%3E%3C!-- Top Floating Block --%3E%3Cpath d='M0 -220 L70 -180 L0 -140 L-70 -180 Z' fill='%233b82f6' opacity='0.9' stroke='%2360a5fa' stroke-width='1'/%3E%3Cpath d='M-70 -180 L0 -140 L0 -100 L-70 -140 Z' fill='%231d4ed8' opacity='0.9'/%3E%3Cpath d='M70 -180 L70 -140 L0 -100 L0 -140 Z' fill='%232563eb' opacity='0.9'/%3E%3C/g%3E%3C!-- Deco --%3E%3Crect x='40' y='40' width='320' height='520' fill='none' stroke='%23cbd5e1' stroke-width='1' opacity='0.1'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%2394a3b8'/%3E%3Ccircle cx='360' cy='40' r='3' fill='%2394a3b8'/%3E%3Ccircle cx='40' cy='560' r='3' fill='%2394a3b8'/%3E%3Ccircle cx='360' cy='560' r='3' fill='%2394a3b8'/%3E%3Ctext x='200' y='500' font-family='Arial, sans-serif' font-weight='bold' font-size='14' text-anchor='middle' fill='%2364748b' letter-spacing='2'%3ESTRUCTURE_01%3C/text%3E%3C/svg%3E";

// Defaulting to the "Retro" palette as it is now the first one
export const DEFAULT_PALETTE: PantoneColor[] = [
  { hex: '#FF00CC', name: 'Y2K Pink', code: '17-2031' },
  { hex: '#C0C0C0', name: 'Chrome Silver', code: '14-5002' },
  { hex: '#39FF14', name: 'Acid Lime', code: '13-0550' },
  { hex: '#0000FF', name: 'Hyperlink Blue', code: '18-3963' },
  { hex: '#FF6600', name: 'Winamp Orange', code: '16-1364' },
  { hex: '#9933CC', name: 'Vaporwave', code: '18-3224' },
  { hex: '#00CED1', name: 'Dial-Up Teal', code: '16-4725' },
  { hex: '#FFFF00', name: 'Gif Yellow', code: '12-0752' }
];

export const PRESET_THEMES: Record<string, ThemePreset> = {
  'retro': {
    name: 'Retro',
    vibe: 'Candy colors, glossy gradients, chrome + sticker energy — playful, loud, internet-native nostalgia.',
    cardBackImage: RETRO_BG,
    palette: DEFAULT_PALETTE
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    vibe: 'Near-black base with electric neon accents — bold glow, high contrast, HUD/terminal intensity.',
    cardBackImage: CYBER_BG,
    palette: [
      { hex: '#09090B', name: 'Void Black', code: '19-0303' },
      { hex: '#00FF94', name: 'Terminal Green', code: '13-0340' },
      { hex: '#FF00FF', name: 'Laser Magenta', code: '18-2043' },
      { hex: '#00FFFF', name: 'Cyber Cyan', code: '16-4535' },
      { hex: '#7C3AED', name: 'Electric Indigo', code: '19-3748' },
      { hex: '#FACC15', name: 'High-Vis Yellow', code: '12-0643' },
      { hex: '#EC4899', name: 'Glitch Pink', code: '17-1937' },
      { hex: '#1E293B', name: 'Dark Grid', code: '19-3910' }
    ]
  },
  'enterprise': {
    name: 'Enterprise',
    vibe: 'Calm, credible, “built to ship” — neutral-heavy, clarity-first, low-fatigue for complex workflows.',
    cardBackImage: ENT_BG,
    palette: [
      { hex: '#0F172A', name: 'Admin Slate', code: '19-4023' },
      { hex: '#3B82F6', name: 'Primary Action', code: '18-3949' },
      { hex: '#10B981', name: 'Status Green', code: '16-5938' },
      { hex: '#64748B', name: 'Body Text', code: '17-5102' },
      { hex: '#F1F5F9', name: 'Canvas Grey', code: '11-4001' },
      { hex: '#6366F1', name: 'Dev Indigo', code: '18-3943' },
      { hex: '#F59E0B', name: 'Warning Amber', code: '14-1050' },
      { hex: '#E2E8F0', name: 'Border Line', code: '12-4401' }
    ]
  }
};

export const CARD_FLIP_DELAY = 1000;
export const PREVIEW_TIME = 2000;