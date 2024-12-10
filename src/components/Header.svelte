<script lang="ts">
	import ModeSwitch from '$src/components/ModeSwitch.svelte';
	import { onMount } from 'svelte';
	

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
</script>

<div class="flex w-full flex-row justify-center">
	<div 
		class="{isScrolled ? "glass" : ""} fixed flex w-fit flex-row items-center justify-between gap-10 rounded-lg px-3 py-2"
		>
		<a href="/" aria-label="Inicio - Pulso de Nieve">
			<img src="/pulso.png" alt="Pulso de Nieve" class="max-w-20" />
		</a>
		
		<ModeSwitch />
	</div>
</div>

