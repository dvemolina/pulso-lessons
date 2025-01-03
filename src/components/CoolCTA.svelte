<script lang="ts">
	
	interface Props {
		bgColor?: string;
		bgSubtleColor?: string;
		highlightColor?: string;
		highlightSubtleColor?: string;
		paddingProp?: string;
		borderRadius?: string;
		btnWidth?: string;
		type?: "button" | "submit" | "reset";
		onClick?: any,
		children?: import('svelte').Snippet;
	}

	let {
		bgColor = "var(--cta-primary)",
		bgSubtleColor = 'var(--primary-active)',
		highlightColor = 'var(--primary-active)',
		highlightSubtleColor = 'var(--primary-active)',
		paddingProp = '0.9rem 2rem',
		borderRadius = '360px',
		btnWidth = '',
		type = "submit",
		onClick,
		children
	}: Props = $props();
	
</script>

<button
onclick={onClick}
	type={type}
	class="shiny-cta"
	style="--shiny-cta-bg: {bgColor}; --shiny-cta-bg-subtle: {bgSubtleColor}; --shiny-cta-highlight: {highlightColor}; --shiny-cta-highlight-subtle: {highlightSubtleColor}; padding: {paddingProp}; border-radius: {borderRadius}; width: {btnWidth};"
	>
	<span>
		{@render children?.()}
	</span>
</button>

<style lang="postcss">
	:root {
		
		--shiny-cta-fg: #f4f4f4;
		--transition: all 3s ease-in;
	}

	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@property --gradient-angle-offset {
		syntax: '<angle>';
		initial-value: 100deg;
		inherits: false;
	}

	@property --gradient-percent {
		syntax: '<percentage>';
		initial-value: 50%;
		inherits: false;
	}

	@property --gradient-shine {
		syntax: '<color>';
		initial-value: rgba(255, 255, 255, 0);
		inherits: false;
	}

	.shiny-cta {
		--animation: gradient-angle linear infinite;
		--duration: 3s;
		--shadow-size: 2px;
		isolation: isolate;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		outline-offset: 4px;
		font-family: "Fira Sans";
		line-height: 1.2;
		border: 0.5px solid var(--shiny-cta-highlight-subtle);
		color: var(--shiny-cta-fg);
		background:var(--shiny-cta-bg);
		box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
		height: fit-content;
	}

	.shiny-cta::before,
	.shiny-cta::after,
	.shiny-cta span::before {
		content: '';
		pointer-events: none;
		position: absolute;
		inset-inline-start: 50%;
		inset-block-start: 50%;
		translate: -50% -50%;
		z-index: -1;
	}

	.shiny-cta:active {
		translate: 0 1px;
	}

	/* Dots pattern 
	.shiny-cta::before {
		--size: calc(100% - var(--shadow-size) * 3);
		--position: 2px;
		--space: calc(var(--position) * 2);
		width: var(--size);
		height: var(--size);
		background: radial-gradient(
				circle at var(--position) var(--position),
				white calc(var(--position) / 4),
				transparent 0
			)
			padding-box;
		background-size: var(--space) var(--space);
		background-repeat: space;
		mask-image: conic-gradient(
			from calc(var(--gradient-angle) + 45deg),
			black,
			transparent 10% 90%,
			black
		);
		border-radius: inherit;
		opacity: 0.4;
		z-index: -1;
	}*/

	/* Inner shimmer */
	.shiny-cta::after {
		--animation: shimmer linear infinite;
		width: 100%;
		aspect-ratio: 1;
		background: linear-gradient(-50deg, transparent, var(--shiny-cta-highlight), transparent);
		mask-image: radial-gradient(circle at bottom, transparent 40%, black);
		opacity: 0.6;
	}

	.shiny-cta span {
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.shiny-cta span::before {
		--size: calc(100% + 1rem);
		width: var(--size);
		height: var(--size);
		box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
		opacity: 0;
	}

	/* Animate */
	.shiny-cta {
		--transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);
		transition: var(--transition);
		transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
	}

	.shiny-cta,
	.shiny-cta::before,
	.shiny-cta::after {
		animation:
			var(--animation) var(--duration),
			var(--animation) calc(var(--duration) / 0.4) reverse paused;
		animation-composition: add;
	}

	.shiny-cta span::before {
		transition: opacity var(--transition);
		animation: calc(var(--duration) * 1.5) breathe linear infinite;
	}

	.shiny-cta:is(:hover, :focus-visible) {
		--gradient-percent: 20%;
		--gradient-angle-offset: 95deg;
		--gradient-shine: var(--shiny-cta-highlight-subtle);
	}

	.shiny-cta:is(:hover, :focus-visible),
	.shiny-cta:is(:hover, :focus-visible)::before,
	.shiny-cta:is(:hover, :focus-visible)::after {
		animation-play-state: running;
	}

	.shiny-cta:is(:hover, :focus-visible) span::before {
		opacity: 1;
	}

	@keyframes gradient-angle {
		to {
			--gradient-angle: 360deg;
		}
	}

	@keyframes shimmer {
		to {
			rotate: 360deg;
		}
	}

	@keyframes breathe {
		from,
		to {
			scale: 1;
		}
		50% {
			scale: 1.2;
		}
	}
</style>
