import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        defaultLabelBorder: '#CBB6E5',
        activeLabelBorder: '#761BE4',
        errorLabelBorder: '#ED4545',
        defaultLabelBg: '#FFFFFF',
        activeLabelBg: '#FAF9FA',
        errorLabelBg: '#FEECEC',
        //
        inactiveButton: '#CBB6E5',
        defaultButton: '#761BE4',
        hoverButton: '#6A19CD',
        //
        textColor: '#000853',
        inactiveDayColor: '#898DA9',
        //
        bgColor: '#F0EAF8',
      },
    },
  },
  plugins: [],
};
export default config;
