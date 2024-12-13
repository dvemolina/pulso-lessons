<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { fly } from 'svelte/transition';

	$effect(() => {
		console.log('Applied mode: ', $mode);
	});
</script>

<button
	aria-label="Mode Switcher"
	onclick={toggleMode}
	class="flex cursor-pointer flex-row items-center justify-center rounded-full border-2 border-text p-1 opacity-65 transition-all hover:opacity-90"
>
	{#if $mode === 'light'}
		<img in:fly={{ y: 10 }} class="size-3" src="/svg/sun.svg" alt="Light Mode Switch" />
	{:else}
		<img in:fly={{ y: -10 }} class="size-3" src="/svg/moon.svg" alt="Dark Mode Switch" />
	{/if}
</button>
