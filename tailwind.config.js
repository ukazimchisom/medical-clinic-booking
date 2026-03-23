/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right, rgba(13, 180, 185, 0.85), rgba(13, 180, 185, 0.4), rgba(13, 180, 185, 0.0)), url('/doctor-patient-3.jpg')",
      },
    },
  },
  plugins: [],
};
