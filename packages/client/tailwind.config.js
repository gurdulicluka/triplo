/** @type {import('tailwindcss').Config} */
// biome-ignore lint/style/noDefaultExport: <explanation>
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {},
	},
	plugins: [],
};
