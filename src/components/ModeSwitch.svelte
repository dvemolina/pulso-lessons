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
	class="flex cursor-pointer flex-row items-center justify-center opacity-75 transition-all hover:opacity-90"
>
	{#if $mode === 'light'}
		<img
			in:fly={{ y: 10 }}
			class="size-6 rounded-full invert-0 dark:invert"
			src="/svg/sun.svg"
			alt="Light Mode Switch"
		/>
	{:else}
		<img
			in:fly={{ y: -10 }}
			class="size-6 rounded-full invert-0 dark:invert"
			src="/svg/moon.svg"
			alt="Dark Mode Switch"
		/>
	{/if}
</button>
