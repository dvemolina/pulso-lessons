<script lang="ts">
	import ContentBox from '$src/components/ContentBox.svelte';
	import CoolCTA from '$src/components/CoolCTA.svelte';

	let { data } = $props();
</script>

<h1 class="mb-4 font-fira text-2xl text-text">Disponibilidad</h1>
<h2 class="mb-8 px-2 font-sans text-xl text-textNeutral">
	Modifica tu Temporada y Disponibilidad.
</h2>
<ContentBox>
	<h3 class="mb-8 border-b border-border text-xl">Temporada - Disponibilidad General</h3>

	<CoolCTA
		type="submit"
		paddingProp="1rem 1.5rem"
		bgSubtleColor="var(--primary)"
		highlightColor="var(--primary)"
		highlightSubtleColor="var(--primary)">Guardar Datos Temporada</CoolCTA
	>
</ContentBox>
<ContentBox>
	<h3 class="mb-8 border-b border-b-border text-xl">Cierres - Disponibilidad específica</h3>
</ContentBox>
