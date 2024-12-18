<script>
	import CoolCTA from '$src/components/CoolCTA.svelte';
	import ContentBox from '$src/components/ContentBox.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userProfileSchema } from '$src/features/Users/lib/userValidations';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import { countryPrefix } from '$src/lib/utils/utils';

	let { data } = $props();
	const userProfileForm = superForm(data.form, {
		validators: zodClient(userProfileSchema)
	});

	const countryPrefixes = countryPrefix

	const { form: userProfileData, enhance: userProfileEnhance } = userProfileForm;
</script>

<h1 class="mb-4 font-fira text-2xl font-semibold">Perfil</h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">Modifica tus Datos y Detalles.</h2>
<ContentBox shadow={true}>
	<h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Detalles Personales</h3>
	<form
		action="?/userProfile"
		method="POST"
		use:userProfileEnhance
		class="flex-col flex w-full justify-center gap-8"
	>
	<fieldset class="flex flex-col gap-4 w-full">
		<div class="formgroup">
			<FormField form={userProfileForm} name="name" description="Visible en tu perfil, comentarios y valoraciones">
				<CustomControl label="Nombre">
					{#snippet children({props})}
					<input {...props} type="text" bind:value={$userProfileData.name} class="w-full" placeholder="Nombre"/>
					{/snippet}
				</CustomControl>
				<Description>Visible en Perfil y Valoraciones</Description>
			</FormField>
			<FormField form={userProfileForm} name="surname">
				<CustomControl label="Apellido/s">
					{#snippet children({props})}
					<input {...props} type="text" bind:value={$userProfileData.surname} class="w-full" placeholder="Apellido/s"/>
					{/snippet}
				</CustomControl>
			</FormField>
		</div>
		<div class="formgroup">
			<FormField form={userProfileForm} name="country_code">
				<CustomControl label="Prefijo Internacional">
					{#snippet children({props})}
					<select {...props} bind:value={$userProfileData.country_code} class="w-full">
						<option value="">Prefijo Internacional</option>
						{#each countryPrefixes as { value, label }}
						<option {value} aria-label={label}>{label}</option>
						{/each}
					</select>
					{/snippet}
				</CustomControl>
			</FormField>
			<FormField form={userProfileForm} name="phone_number">
				<CustomControl label="Teléfono">
					{#snippet children({props})}
					<input {...props} type="number" bind:value={$userProfileData.phone_number} class="w-full" placeholder="Teléfono"/>
					{/snippet}
				</CustomControl>
			</FormField>
		</div>
		<FormField form={userProfileForm} name="email">
			<CustomControl label="Email">
				{#snippet children({props})}
				<input {...props} type="email" bind:value={$userProfileData.email} class="w-full" placeholder="Correo Electrónico"/>
				{/snippet}
			</CustomControl>
		</FormField>
	</fieldset>

		<CoolCTA type="submit" paddingProp="1rem 1.5rem">Guardar Datos Usuario</CoolCTA>
	</form>
</ContentBox>

<ContentBox>
	<h3 class="mb-8 border-b border-b-border font-fira text-xl font-semibold">
		Detalles Profesionales - Instructor
	</h3>
	<form action="" method="POST"></form>
</ContentBox>
