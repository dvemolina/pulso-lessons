import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	darkMode: "selector",
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				bgNeutral: "var(--background-neutral)",
				text: "var(--text)",
				textNeutral: "var(--text-neutral)",
				border: "var(--border)",
				borderActive: "var(--border-active)",
				primary: "var(--primary)",
				primaryActive: "var(--primary-active)",
				primaryWashed: "var(--primary-washed)",
				secondary: "var(--secondary)",
				secondaryActive: "var(--secondary-active)",
				secondaryWashed: "var(--secondary-washed)",
				error: "var(--error)"
			},
			fontFamily: {
				sans: ['Public Sans', 'Arial', 'Helvetica', 'sans-serif'], 
				code: ['Fira Code', 'Courier New', 'monospace'], 
				fira: ['Fira Sans', 'Courier New', 'monospace']
			  },
			screens: {
				"2xl": "1795px"
			}
		}
	},

	plugins: [forms, containerQueries]
} satisfies Config;
