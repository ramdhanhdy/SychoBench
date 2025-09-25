// Design System for SycoBench Methodology Page
// Centralized color management for easy palette experimentation

export interface ColorPalette {
  background: string;
  text: {
    primary: string;    // Main headings, emphasis
    secondary: string;  // Body text, readable content
    accent: string;     // Highlights, subsections
    muted: string;      // Subtle elements, borders
    code: string;       // Code block text
  };
  surface: {
    card: string;       // Card backgrounds
    border: string;     // Border colors
    hover: string;      // Hover states
  };
  semantic: {
    info: string;       // Information highlights
    warning: string;    // Warning elements
    success: string;    // Success states
  };
}

// Édifis Palette (Current)
export const edifisPalette: ColorPalette = {
  background: '#0D0D0D',
  text: {
    primary: '#F2F2F2',    // Édifis-5
    secondary: '#E6E6E6',  // Édifis-3
    accent: '#D9D9D9',     // Édifis-4
    muted: '#525259',      // Édifis-1
    code: '#9FA1A6',       // Édifis-3
  },
  surface: {
    card: 'rgba(82, 82, 89, 0.1)',
    border: '#525259',
    hover: 'rgba(199, 206, 216, 0.1)',
  },
  semantic: {
    info: '#D9D9D9',
    warning: '#9FA1A6',
    success: '#D9D9D9',
  },
};

// Alternative Palettes for Easy Experimentation

// Oceanic Palette
export const oceanicPalette: ColorPalette = {
  background: '#0A1628',
  text: {
    primary: '#F7FAFC',
    secondary: '#A0AEC0',
    accent: '#63B3ED',
    muted: '#4A5568',
    code: '#A0AEC0',
  },
  surface: {
    card: 'rgba(74, 85, 104, 0.1)',
    border: '#4A5568',
    hover: 'rgba(99, 179, 237, 0.1)',
  },
  semantic: {
    info: '#63B3ED',
    warning: '#F6AD55',
    success: '#68D391',
  },
};

// Forest Palette
export const forestPalette: ColorPalette = {
  background: '#0F1419',
  text: {
    primary: '#FAFAFA',
    secondary: '#A8B2A8',
    accent: '#7FB069',
    muted: '#3D4A3D',
    code: '#A8B2A8',
  },
  surface: {
    card: 'rgba(61, 74, 61, 0.1)',
    border: '#3D4A3D',
    hover: 'rgba(127, 176, 105, 0.1)',
  },
  semantic: {
    info: '#7FB069',
    warning: '#D4A574',
    success: '#7FB069',
  },
};

// Monochrome Palette
export const monochromePalette: ColorPalette = {
  background: '#0A0A0A',
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    accent: '#E6E6E6',
    muted: '#404040',
    code: '#B3B3B3',
  },
  surface: {
    card: 'rgba(64, 64, 64, 0.1)',
    border: '#404040',
    hover: 'rgba(230, 230, 230, 0.1)',
  },
  semantic: {
    info: '#E6E6E6',
    warning: '#B3B3B3',
    success: '#E6E6E6',
  },
};

// Current active palette - change this to experiment with different themes
export const currentPalette = edifisPalette;

// Utility functions for generating color variations
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba with opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// CSS-in-JS style generators
export const getStyles = (palette: ColorPalette = currentPalette) => ({
  // Layout styles
  page: {
    backgroundColor: palette.background,
  },
  
  // Typography styles
  heading: {
    color: palette.text.primary,
  },
  subheading: {
    color: palette.text.accent,
  },
  body: {
    color: palette.text.secondary,
  },
  muted: {
    color: palette.text.muted,
  },
  
  // Component styles
  badge: {
    backgroundColor: withOpacity(palette.text.accent, 0.2),
    border: `2px solid ${palette.surface.border}`,
    color: palette.text.accent,
  },
  card: {
    backgroundColor: palette.surface.card,
    borderColor: palette.surface.border,
  },
  codeBlock: {
    backgroundColor: withOpacity(palette.text.muted, 0.2),
    borderColor: palette.surface.border,
    color: palette.text.code,
  },
  highlight: {
    backgroundColor: withOpacity(palette.text.accent, 0.2),
    borderLeftColor: palette.text.accent,
  },
  
  // Interactive styles
  link: {
    color: palette.text.muted,
  },
  linkHover: {
    color: palette.text.accent,
  },
  
  // Visualization styles
  quadrant: {
    primary: {
      backgroundColor: withOpacity(palette.text.accent, 0.2),
      borderColor: palette.text.accent,
    },
    secondary: {
      backgroundColor: withOpacity(palette.text.muted, 0.2),
      borderColor: palette.surface.border,
    },
    tertiary: {
      backgroundColor: withOpacity(palette.text.secondary, 0.1),
      borderColor: palette.text.secondary,
    },
  },
  
  // Bullet and accent colors
  bullet: {
    color: palette.text.muted,
  },
  emphasis: {
    color: palette.text.accent,
  },
});

// Export commonly used style objects
export const styles = getStyles();
