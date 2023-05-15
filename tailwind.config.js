/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/layouts/**/*.js',
	],
	theme: {
		colors: {
			default: '#1E1E1E',
			white: '#fff',
			primary: '#E86A33',
			slate: 'rgb(212 212 216)',
			green: '#4CB14C',
		},
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
		},
		fontSize: {
			sm: '0.9rem',
			base: '1rem',
			lg: '1.1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
		},
	},
	plugins: [],
}
