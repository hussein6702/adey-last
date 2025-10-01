module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
    // add more paths if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        merriweather: ['Merriweather', 'Serif'],
        crimson:['Crimson Text','serif'],
        lato :['Lato','sans-serif']
   
      },
    },
  },
};