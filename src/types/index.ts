export interface RSVPData {
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  dates: string[];
  dietary?: string;
  partyLevel: number;
  tshirtSize: string;
  wonGame: boolean;
}

export type GameScreen = 'landing' | 'game' | 'rsvp' | 'success';

export type Symbol = '💰' | '💀' | '🏖️' | '☀️' | '💨' | '🍄' | '😊' | '🎉' | '🥳' | '🍻' | '🎊' | '❤️';

export const SYMBOLS: Symbol[] = ['💰', '💀', '🏖️', '☀️', '💨', '🍄', '😊', '🎉', '🥳', '🍻', '🎊', '❤️'];

export const DATES = [
  'Thursday, April 30',
  'Friday, May 1', 
  'Saturday, May 2',
] as const;

export const TSHIRT_SIZES = [
  'Small',
  'Medium',
  'Large',
  'XL',
  'XXL',
  'XXXL',
] as const;

// Predetermined spin results - spin 5 is the winner!
export const SPIN_SEQUENCE: [Symbol, Symbol, Symbol][] = [
  ['💀', '🏖️', '☀️'],      // Spin 1: no match
  ['💨', '💨', '🍄'],       // Spin 2: 2 match - near miss!
  ['😊', '🎉', '🍻'],       // Spin 3: no match
  ['☀️', '☀️', '🥳'],       // Spin 4: 2 match - near miss!
  ['❤️', '❤️', '❤️'],       // Spin 5: WIN! All hearts!
];
