<script lang="ts">
	import { goto } from '$app/navigation';
	import DurationEdit from '$src/features/services/ui/service-edit/DurationEdit.svelte';
	import GeneralDetailsEdit from '$src/features/services/ui/service-edit/GeneralDetailsEdit.svelte';
	import type { PageData } from './$types';
	import BasePricingEdit from '$src/features/services/ui/service-edit/BasePricingEdit.svelte';
	import StudentsEdit from '$src/features/services/ui/service-edit/StudentsEdit.svelte';
	import ConditionalPricingEdit from '$src/features/services/ui/service-edit/ConditionalPricingEdit.svelte';
	import SeasonalPricingEdit from '$src/features/services/ui/service-edit/SeasonalPricingEdit.svelte';
	import PromotionalPricingEdit from '$src/features/services/ui/service-edit/PromotionalPricingEdit.svelte';
	import ShinyCta from '$src/components/elements/buttons/ShinyCTA.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const form = data.form;
</script>

<button
	onclick={() => goto('../services')}
	class="transition-color group mb-2 flex flex-row items-center justify-center gap-3 text-sm text-neutral-light-inactive duration-100 ease-in-out hover:text-neutral-light"
>
	<iconify-icon icon="pixelarticons:arrow-left"></iconify-icon>
	<p>Servicios</p>
</button>
<h1 class="mb-4 text-[2.7rem] text-neutral-light-inactive">Crear Nuevo Servicio</h1>

<form action="" method="post">
	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-8 border-b border-b-neutral-gray text-lg-typo">Detalles Generales</h2>
		<GeneralDetailsEdit />
	</div>

	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-8 border-b border-b-neutral-gray text-lg-typo">Alumnos</h2>
		<StudentsEdit />
	</div>

	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-8 border-b border-b-neutral-gray text-lg-typo">Duración</h2>
		<DurationEdit />
	</div>

	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-8 border-b border-b-neutral-gray text-lg-typo">Precio - Básico</h2>
		<BasePricingEdit />
	</div>
	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-4 border-b border-b-neutral-gray text-lg-typo">Precio - Condicional</h2>
		<p class="mb-8">
			Se aplicará sobre el Precio Final del Servicio según las condiciones que se cumplan en el
			momento de la reserva
		</p>
		<ConditionalPricingEdit />
	</div>
	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-4 border-b border-b-neutral-gray text-lg-typo">Precio - Temporadas</h2>
		<p class="mb-8">
			Se aplicará sobre el Precio Final del Servicio en el momento de la reserva según las fechas
			indicadas en la pestaña de 'Disponibilidad'
		</p>
		<SeasonalPricingEdit />
	</div>
	<div class="section pb mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-8">
		<h2 class="mb-4 border-b border-b-neutral-gray text-lg-typo">Precio - Promociones</h2>
		<p class="mb-8">
			Se aplicará sobre el Precio Final del Servicio según las fechas/códigos que se cumplan en el
			momento de la reserva.
		</p>
		<PromotionalPricingEdit />
	</div>

	<div
		class="section mb-10 flex flex-row items-center justify-center gap-10 rounded-lg border-2 border-neutral-gray p-6"
	>
		<ShinyCta>Eliminar Servicio</ShinyCta>
		<ShinyCta
			bgSubtleColor="var(--primary)"
			highlightColor="var(--primary)"
			highlightSubtleColor="var(--primary)">Guardar Servicio</ShinyCta
		>
	</div>
</form>

<style>
	.section {
		box-shadow: 1px 1px 7px 2px rgba(0, 0, 0, 0.444);
	}
</style>
