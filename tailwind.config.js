module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'tablet': '640px',
      'laptop': '940px',
      'desktop': '1024px',
      'bigscreen': '1280px',
    },
  },
  plugins: [],
};
