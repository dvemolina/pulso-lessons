import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				text: "var(--text)",
				border: "var(--border)",
				borderActive: "var(--border-active)",
				primary: "var(--primary)",
				primaryActive: "var(--primary-active)",
				secondary: "var(--secondary)",
				secondaryActive: "var(--secondary-active)",
				error: "var(--error)"
			},
			fontFamily: {
				sans: ['Public Sans', 'Arial', 'Helvetica', 'sans-serif'], 
				code: ['Fira Code', 'Courier New', 'monospace'], 
				fira: ['Fira Sans', 'Courier New', 'monospace']
			  },
		}
	},

	plugins: [forms, containerQueries]
} satisfies Config;
