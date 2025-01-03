<script lang="ts">
	import ContentBox from '$src/components/ContentBox.svelte';
	import CoolCTA from '$src/components/CoolCTA.svelte';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import { availabilitySchema, weekDays } from '$src/features/Availability/lib/availabilityValidation.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { generateTimeOptions } from '$src/lib/utils/utils.js';
	import { onMount } from 'svelte';
	import { Control, Description, FieldErrors, Fieldset, Label, Legend } from 'formsnap';

	let { data } = $props();

	const availabilityForm = superForm(data.form, {
		validators: zodClient(availabilitySchema)
	});

	const { form, enhance } = availabilityForm;

	let dayStartOptions: { label: string; value: string }[] = $state([]);
	let dayEndOptions: { label: string; value: string }[] = $state([]);

	//Populate dayStartOptions on component mount
	onMount(() => {
		if ($form.dayStart) {
			dayStartOptions = generateTimeOptions('00:00', '23:45', 15);
			dayEndOptions = generateTimeOptions($form.dayStart, '23:45', 60);
		} else {
			dayStartOptions = generateTimeOptions('00:00', '23:45', 15);
		}
	});

	$effect(() => {
		if ($form.dayStart) {
			dayEndOptions = generateTimeOptions($form.dayStart, '23:45', 60);
		}
	});
</script>

<h1 class="mb-4 font-fira text-2xl font-semibold text-text">Disponibilidad</h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">
	Modifica tu Temporada y Disponibilidad.
</h2>
<ContentBox>
	<h3 class="mb-8 border-b border-border font-fira font-normal text-xl">Temporada - Disponibilidad General</h3>
	<form
		action="?/generalAvailability"
		method="POST"
		use:enhance
		class="flex w-full flex-col justify-center gap-8"
	>
		<fieldset class="flex w-full flex-col gap-4">
			<div class="formgroup">
				<FormField form={availabilityForm} name="seasonStart">
					<CustomControl label="Fecha Inicio Temporada">
						{#snippet children({ props })}
							<input
								type="date"
								{...props}
								bind:value={$form.seasonStart}
								placeholder="Inicio Temporada"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={availabilityForm} name="seasonEnd">
					<CustomControl label="Fecha Final Temporada">
						{#snippet children({ props })}
							<input
								type="date"
								{...props}
								bind:value={$form.seasonEnd}
								placeholder="Final Temporada"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
			<div class="formgroup">
				<FormField form={availabilityForm} name="dayStart">
					<CustomControl label="Hora Inicio Jornada">
						{#snippet children({ props })}
							<select {...props} bind:value={$form.dayStart}>
								<option value="">Selecciona Hora</option>
								{#each dayStartOptions as { label, value }}
									<option {value}>{label}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={availabilityForm} name="dayEnd">
					<CustomControl label="Hora Final Jornada">
						{#snippet children({ props })}
							<select {...props} bind:value={$form.dayEnd}>
								<option value="">Selecciona Hora</option>
								{#each dayEndOptions as { label, value }}
									<option {value}>{label}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
			<Fieldset form={availabilityForm} name="weekDays" class="flex flex-col gap-4">
				<Legend>Disponibilidad Semanal</Legend>
				<Description
					>Estarás disponible los días de la semana que selecciones en el horario escogido</Description
				>
				<div class="flex flex-row items-center justify-evenly gap-2">
					{#each weekDays as { value, label }}
						<Control>
							{#snippet children({ props })}
								<div class="flex flex-col items-center justify-center gap-2">
									<input
										type="checkbox"
										{...props}
										bind:group={$form.weekDays}
										{value}
										class="size-7 sm:size-10 rounded-sm border border-border bg-bgNeutral"
									/>
									<Label>{label.slice(0, 3)}</Label>
								</div>
							{/snippet}
						</Control>
					{/each}
				</div>
				<FieldErrors />
			</Fieldset>
		</fieldset>
		<CoolCTA
			type="submit"
			paddingProp="1rem 1.5rem"
			bgSubtleColor="var(--primary)"
			highlightColor="var(--primary)"
			highlightSubtleColor="var(--primary)">Guardar Datos Temporada</CoolCTA
		>
	</form>
</ContentBox>
<ContentBox>
	<h3 class="mb-8 border-b border-b-border text-xl">Cierres - Disponibilidad específica</h3>
</ContentBox>
