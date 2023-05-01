/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
		},
		extend: {},
		textColor: {
			primary: '#1E1E1E',
			secondary: '#ffffff',
		},
		colors: {
			primary: '#E86A33', // Replace with your desired primary color
		},
		fontSize: {
			sm: '0.8rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
		},
	},
	plugins: [],
}
