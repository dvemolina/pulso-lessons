<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/public-sans'
	import '@fontsource/fira-sans'
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$src/components/Header.svelte';
	let { children } = $props();
</script>

<ModeWatcher lightClassNames={["light"]}/>
<ParaglideJS {i18n}>
	<Header />
	{@render children()}
</ParaglideJS>
