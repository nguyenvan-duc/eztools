module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    
    extend: {
      boxShadow: {
        'blog-l': '-8px 8px 0 #10162F',
        'blog-d': '-8px 8px 0 #e7f6fe',
        'social-l': '-4px 4px 0 #10162F',
        'social-d': '-4px 4px 0 #e7f6fe',
      },
      spacing: {
        'blog-4m': '-4px',
        'blog-4P': '4px'
      },
      colors: {
        "codecademy":"#FFF0E5"
      },
    },
  },
  plugins: [],
}