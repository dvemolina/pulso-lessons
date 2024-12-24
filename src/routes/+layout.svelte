<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/public-sans';
	import '@fontsource/fira-sans';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher lightClassNames={['light']} />
<ParaglideJS {i18n}>
	<div class="greenball">
			{@render children()}
	</div>
</ParaglideJS>

<style>
	.greenball {
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.greenball::before {
		content: '';
		background: var(--bottom-gradient), var(--greenball);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.8;
		z-index: -2;
	}

</style>
