<script lang="ts">
	import ModeSwitch from '$src/components/ModeSwitch.svelte';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher'

	let isDark = $state();

	let isScrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 0;
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$effect(()=> {
		isDark = $mode ==="dark"
	})
</script>

<div class="mt-4 flex w-full flex-row justify-center">
	<div
		class="{isScrolled
			? 'glass'
			: ''} fixed flex w-fit flex-row items-center justify-between gap-10 rounded-lg px-3 py-2"
	>
		<a href="/" aria-label="Inicio - Pulso de Nieve">
			<img
				src={isDark ? '/pulso.png' : '/pulso-dark.png'}
				alt="Pulso de Nieve"
				class="max-w-20"
			/>
		</a>

		<ModeSwitch />
	</div>
</div>
