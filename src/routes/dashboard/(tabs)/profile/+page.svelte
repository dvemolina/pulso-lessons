<script lang="ts">
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
		validators: zodClient(userProfileSchema),
		onSubmit: ({ formData }) => {
			console.log('Form submission data:', Object.fromEntries(formData));
		}
	});
	const { form: userProfileData, enhance: userProfileEnhance } = userProfileForm;

	const countryPrefixes = countryPrefix;

	let fileInputRef: HTMLInputElement;
	function triggerFileInput() {
		fileInputRef.click();
	}

	let isImageLoading: boolean = $state(false);
	let previewUrl: string | null = $state(null);

function handleFileChange(file: File | undefined | null) {
    if(file) {
		isImageLoading = true
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Result = e.target?.result as string;
            previewUrl = base64Result;
            // Set the base64 string in the form data
            $userProfileData.profileImage = base64Result;
        };
        reader.readAsDataURL(file);
		isImageLoading = false
    }
}
</script>

<h1 class="mb-4 font-fira text-2xl font-semibold">Perfil</h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">Modifica tus Datos y Detalles.</h2>
<ContentBox shadow={true}>
	<h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Detalles Personales</h3>
	<form
		action="?/userProfile"
		method="POST"
		use:userProfileEnhance
		enctype="multipart/form-data"
		class="flex w-full flex-col justify-center gap-8"
		onsubmit={(e) => {
			e.preventDefault();
			if (isImageLoading) {
				alert('Please wait for the image to finish loading');
				return;
			}
		}}
	>
		<fieldset class="flex w-full flex-col gap-4">
			<div class="formgroup">
				<div class="flex w-full flex-col items-center justify-center gap-2">
					<div
						class="flex size-28 flex-col overflow-hidden rounded-full border-2 border-border sm:size-32 md:size-36 lg:size-40 xl:size-44"
					>
					<img src={previewUrl || $userProfileData.profileImage} alt="Imagen de Usuario {data.user.name}" class="object-cover object-center">
				</div>
					<FormField form={userProfileForm} name="profileImage" >
						<CustomControl hiddenLabel={true} label="Imagen de Perfil">
							{#snippet children({ props })}
								<input
									type="file"
									accept="image/*"
									hidden
									{...props}
									bind:this={fileInputRef}
									onchange={(e) => handleFileChange(e.currentTarget.files[0])}
								/>
								<div class="mt-2 flex w-full flex-row justify-center">
									<CoolCTA
										type="button"
										{...props}
										onClick={triggerFileInput}
										paddingProp="0.5rem 1rem"
										btnWidth="200px"
										bgColor="var(--cta-secondary)"
										bgSubtleColor="var(--secondary-washed)"
										highlightColor="var(--secondary-washed)"
										highlightSubtleColor="var(--secondary-washed)"><p class="text-text">{isImageLoading ? 'Cambiando...' : 'Cambiar Imagen'}</p> </CoolCTA
									>
								</div>
							{/snippet}
						</CustomControl>
					</FormField>
				</div>
				<div class="flex w-full flex-col justify-center gap-4">
					<FormField
						form={userProfileForm}
						name="name"
						description="Visible en tu perfil, comentarios y valoraciones"
					>
						<CustomControl label="Nombre">
							{#snippet children({ props })}
								<input
									{...props}
									type="text"
									bind:value={$userProfileData.name}
									class="w-full"
									placeholder="Nombre"
								/>
							{/snippet}
						</CustomControl>
						<Description>Visible en Perfil y Valoraciones</Description>
					</FormField>
					<FormField form={userProfileForm} name="surname">
						<CustomControl label="Apellido/s">
							{#snippet children({ props })}
								<input
									{...props}
									type="text"
									bind:value={$userProfileData.surname}
									class="w-full"
									placeholder="Apellido/s"
								/>
							{/snippet}
						</CustomControl>
					</FormField>
				</div>
			</div>
			<div class="formgroup">
				<FormField form={userProfileForm} name="country_code">
					<CustomControl label="Prefijo Internacional">
						{#snippet children({ props })}
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
						{#snippet children({ props })}
							<input
								{...props}
								type="number"
								bind:value={$userProfileData.phone_number}
								class="w-full"
								placeholder="Teléfono"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
			<FormField form={userProfileForm} name="email">
				<CustomControl label="Email">
					{#snippet children({ props })}
						<input
							{...props}
							type="email"
							bind:value={$userProfileData.email}
							class="w-full"
							placeholder="Correo Electrónico"
						/>
					{/snippet}
				</CustomControl>
			</FormField>
		</fieldset>

		<CoolCTA type="submit" paddingProp="1rem 1.5rem"><p class="text-text">Guardar Datos Usuario</p></CoolCTA>
	</form>
</ContentBox>

<ContentBox>
	<h3 class="mb-8 border-b border-b-border font-fira text-xl font-semibold">
		Detalles Profesionales - Instructor
	</h3>
	<form action="" method="POST"></form>
</ContentBox>
