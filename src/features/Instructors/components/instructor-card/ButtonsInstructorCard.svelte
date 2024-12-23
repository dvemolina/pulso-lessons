<script lang="ts">
	import CoolCTA from '$src/components/CoolCTA.svelte';
	
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
			<iconify-icon class="btn-icon" icon="pixelarticons:human-handsup"></iconify-icon>
			Perfil
		</CoolCTA>
		<CoolCTA
			btnWidth="100%"
			paddingProp="0.5rem 1.5rem"
			borderRadius="7px"
		>
			<iconify-icon class="btn-icon" icon="pixelarticons:calendar-search"></iconify-icon>
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
	
	.btn-icon {
		font-size: 1.2rem;
	}
</style>
