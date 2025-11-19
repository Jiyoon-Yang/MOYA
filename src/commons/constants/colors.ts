// MOYA Color Palette
export const COLORS = {
  // Main Colors
  apricotCoral: '#F3A78B',
  softTerra: '#D78063',
  sandBeige: '#EDE6DA',
  
  // Sub Colors
  charcoalNavy: '#2F3445',
  sageGreen: '#AEBFA8',
  
  // Point Color
  coralRed: '#E25C4A',
  
  // Neutral Colors
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#999999',
  darkGray: '#666666',
} as const;

export type ColorKey = keyof typeof COLORS;
