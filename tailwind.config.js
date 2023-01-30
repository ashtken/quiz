/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				Blue: "#2285c8",
				SecondaryBlue: "#32bdde",
			},
		},
	},
	plugins: [],
};
