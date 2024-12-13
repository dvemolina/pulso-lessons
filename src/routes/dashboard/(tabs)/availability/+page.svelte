<script lang="ts">
	import ShinyCta from '$src/components/elements/buttons/ShinyCTA.svelte';
	import GeneralAvailability from '$src/features/availability/ui/edit/GeneralAvailability.svelte';
	import { today } from '@internationalized/date';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	
	const { form, errors, enhance, message } = superForm(data.form, {
		validators: 'clear',
	});

	if (!$form.seasonStart) {
			$form.seasonStart = today('UTC').toString()
		}
	if (!$form.seasonEnd) {
		$form.seasonEnd = '2025-04-10'
	}
	
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<h1 class="mb-4 text-xl-typo">Disponibilidad</h1>
	<h2 class="mb-8 px-2 text-neutral-light-inactive text-lg-typo">
		Modifica tu Temporada y Disponibilidad.
	</h2>
	<div class="section mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pb-8 pt-6">
		<h3 class="mb-8 border-b border-b-neutral-gray text-lg-typo">
			Temporada - Disponibilidad General
		</h3>

		<GeneralAvailability bind:seasonStart={$form.seasonStart} bind:seasonEnd={$form.seasonEnd} bind:dayStart={$form.dayStart} bind:dayEnd={$form.dayEnd}  bind:weekDays={$form.weekDays}/>

		<ShinyCta
			type="submit"
			paddingProp="1rem 1.5rem"
			bgSubtleColor="var(--primary)"
			highlightColor="var(--primary)"
			highlightSubtleColor="var(--primary)">Guardar Datos Temporada</ShinyCta
		>
	</div>

	<div class="section mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pb-8 pt-6">
		<h3 class="mb-8 border-b border-b-neutral-gray text-lg-typo">
			Cierres - Disponibilidad específica
		</h3>
	</div>
</form>
