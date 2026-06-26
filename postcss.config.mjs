const config = {
	plugins: {
		"@tailwindcss/postcss": {},
	},
	theme: {
		extend: {
			colors: {
				bg: "#0B0F14",
				surface: "#131922",
				border: "#1F2733",
				muted: "#7C8798",
				gain: "#2ECC71",
				loss: "#FF5C5C",
			},
			fontFamily: {
				display: ["Space Grotesk", "sans-serif"],
				body: ["Inter", "sans-serif"],
				mono: ["IBM Plex Mono", "monospace"],
			},
			keyframes: {
				flash: {
					"0%": { backgroundColor: "rgba(108, 92, 231, 0.25)" },
					"100%": { backgroundColor: "transparent" },
				},
			},
			animation: {
				flash: "flash 800ms ease-in-out",
			},
		},
	},
};

export default config;
