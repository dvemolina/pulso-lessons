<script lang="ts">
	import CoolCTA from '$src/components/CoolCTA.svelte';

	function stopClickPropagation(event: Event) {
		event.stopPropagation();
	}

	interface Props {
		lessonId: any;
	}

	let { lessonId }: Props = $props();
	
</script>

<div class="buttons-element">
	
		<CoolCTA
			btnWidth="100%"
			paddingProp="0.5rem 1.5rem"					
			borderRadius="7px"
			highlightColor="var(--primary)"
			bgSubtleColor="var(--primary)"
			highlightSubtleColor="var(--primary)"
		>
			Detalles
		</CoolCTA>
	
		<CoolCTA
			btnWidth="100%"
			paddingProp="0.5rem 1.5rem"
			borderRadius="7px"
		>
			Reservar
		</CoolCTA>
</div>

<style>
	.buttons-element {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		padding: 0.5rem 0.7rem;
		gap: 0.5rem;
	}

	.button {
		width: 100%;
		opacity: 0.9;
	}
	.button:hover,
	.button:focus {
		opacity: 1;
	}
</style>