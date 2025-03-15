export const theme = {
  colors: {
    primary: {
      DEFAULT: '#1b1f2b',
      light: '#2d3344',
      dark: '#141720',
    },
    secondary: {
      DEFAULT: '#27ae60',
      light: '#2ecc71',
      dark: '#219a52',
    },
    accent: {
      DEFAULT: '#f8faf8',
      light: '#ffffff',
      dark: '#e8eae8',
    },
    text: {
      primary: '#1b1f2b',
      secondary: '#4a5568',
      light: '#718096',
    },
    social: {
      facebook: '#1877F2',
      instagram: '#E4405F',
    },
  },
  typography: {
    fontFamily: {
      heading: 'Playfair Display, serif',
      body: 'system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  spacing: {
    container: {
      padding: '1rem',
      maxWidth: '80rem',
    },
    section: {
      padding: {
        sm: '2rem',
        md: '4rem',
        lg: '6rem',
      },
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
} as const;
