<script>
	import ContentBox from '$src/components/ContentBox.svelte';
	import CoolCta from '$src/components/CoolCTA.svelte';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import LessonsHeader from '$src/components/LessonsHeader.svelte';
	import { searchSchema } from '$src/features/Finder/searchValidations';
	import InstructorCard from '$src/features/Instructors/components/instructor-card-3/InstructorCard.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let hasSearched = $state(false);
	let { data } = $props();

	const searchForm = superForm(data.form, {
		validators: zodClient(searchSchema)
	});

	const { form, enhance } = searchForm;
</script>

{#if !hasSearched}
<div class="flex flex-col items-center justify-center w-full h-full">
	<a href="/">
		<img src="/pulso.png" alt="Inicio Pulso" class="w-24">
	</a>

	<ContentBox>
		<form action="" method="POST" use:enhance class="flex w-full flex-col justify-center gap-4">
			<fieldset >
				<FormField form={searchForm} name="sport">
					<CustomControl label="Selecciona Deporte">
						{#snippet children({ props })}
						<select
						{...props}
						bind:value={$form.sport}
						class="w-full"
						placeholder="Selecciona Deporte"
						>
						{#each data.sports as { id, sport }}
						<option value={id} aria-label={sport}>{sport}</option>
						{/each}
					</select>
					{/snippet}
				</CustomControl>
				</FormField>
				<FormField form={searchForm} name="resort">
					<CustomControl label="Estación">
						{#snippet children({ props })}
						<select
						{...props}
								bind:value={$form.resort}
								class="w-full"
								placeholder="Selecciona Centro"
								>
								{#each data.resorts as { id, resort }}
								<option value={id} aria-label={resort}>{resort}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<div class="formgroup">
					<FormField form={searchForm} name="startDate">
						<CustomControl label="Fecha Inicial">
							{#snippet children({ props })}
							<input
							type="date"
							{...props}
							bind:value={$form.startDate}
							placeholder="Fecha Inicial"
							/>
							{/snippet}
						</CustomControl>
					</FormField>
					<FormField form={searchForm} name="endDate">
						<CustomControl label="Fecha Final">
							{#snippet children({ props })}
							<input
							type="date"
									{...props}
									bind:value={$form.endDate}
									placeholder="Fecha Final"
									/>
									{/snippet}
								</CustomControl>
							</FormField>
						</div>
				<FormField form={searchForm} name="persons">
					<CustomControl label="Nº de Personas">
						{#snippet children({ props })}
						<input
						type="number"
						min="1"
						{...props}
						bind:value={$form.persons}
						placeholder="Fecha Final"
						/>
						{/snippet}
					</CustomControl>
				</FormField>
			</fieldset>
			<CoolCta>Buscar</CoolCta>
		</form>
	</ContentBox>
	<SuperDebug data={$form}/>
</div>
{:else if hasSearched}
<LessonsHeader user={data.user} />
	<div class="wrapper">
		<InstructorCard />
	</div>
	{/if}

<style>
	.wrapper {
		max-width: 1200px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(325px, auto));
		justify-content: center;
		margin: 0 auto;
		padding: 3rem;
		gap: 3.2rem 2.7rem;
	}
</style>
