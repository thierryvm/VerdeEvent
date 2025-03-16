/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        card: "16 / 9",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            img: {
              maxWidth: '300px',
              float: 'left',
              marginRight: '1.5rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            p: {
              clear: 'none',
              marginBottom: '1rem',
            },
            h2: {
              clear: 'both',
            },
            h3: {
              clear: 'both',
            },
            a: {
              color: '#059669',
              '&:hover': {
                color: '#047857',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
