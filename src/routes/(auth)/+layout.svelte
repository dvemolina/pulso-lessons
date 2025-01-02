<script lang="ts">
	import ContentBox from '$src/components/ContentBox.svelte';
	let { children } = $props();
</script>

<div class="flex flex-row items-center justify-center min-h-full">
	<ContentBox>
		<div class="flex flex-col items-center justify-center gap-2">
			<a href="/">
				<img src="/pulso.png" alt="Pulso - Inicio" class="w-24" />
			</a>
			{@render children?.()}
		</div>
	</ContentBox>
</div>
