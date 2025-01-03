<script	lang="ts">
	import CoolCTA from '$src/components/CoolCTA.svelte';
	import ContentBox from '$src/components/ContentBox.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userProfileSchema } from '$src/features/Users/lib/userValidations';
	import { Control, Label, Description, FieldErrors, Legend, Fieldset } from 'formsnap';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import { countryPrefix } from '$src/lib/utils/utils';
	

	let { data } = $props();
	const lists = data.lists

	const userProfileForm = superForm(data.userForm, {
		validators: zodClient(userProfileSchema)
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
		if (file) {
			isImageLoading = true;
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64Result = e.target?.result as string;
				previewUrl = base64Result;
				// Set the base64 string in the form data
				$userProfileData.profileImage = base64Result;
			};
			reader.readAsDataURL(file);
			isImageLoading = false;
		}
	}

</script>

<h1 class="mb-4 font-fira text-2xl font-semibold">Perfil</h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">Modifica tus Datos y Detalles.</h2>
<form
	action="?/userProfile"
	method="POST"
	use:userProfileEnhance
	enctype="multipart/form-data"
	class="flex w-full flex-col justify-center gap-4"
	onsubmit={(e) => {
		e.preventDefault();
		if (isImageLoading) {
			alert('Please wait for the image to finish loading');
			return;
		}
	}}
>
<ContentBox shadow={true}>
	<h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Detalles Personales</h3>
		<fieldset class="flex w-full flex-col gap-4">
			<div class="formgroup">
				<div class="flex w-full flex-col items-center justify-center gap-2">
					<div
						class="flex size-28 flex-col overflow-hidden rounded-full border-2 border-border sm:size-32 md:size-36 lg:size-40 xl:size-44"
					>
						<img
							src={previewUrl || $userProfileData.profileImage}
							alt="Imagen de Usuario {data.user.name}"
							class="object-cover object-center"
						/>
					</div>
					<FormField form={userProfileForm} name="profileImage">
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
										highlightSubtleColor="var(--secondary-washed)"
										><p class="text-text">{isImageLoading ? 'Cambiando...' : 'Cambiar Imagen'}</p>
									</CoolCTA>
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
			<div class="formgroup">
				<FormField form={userProfileForm} name="nationality">
					<CustomControl label="Nacionalidad">
						{#snippet children({ props })}
							<select {...props} bind:value={$userProfileData.nationality} class="w-full" placeholder="Selecciona Nacionalidad">
								<option value="">Selecciona Nacionalidad</option>
								{#each lists.countries as { id, name }}
									<option value={id} aria-label={name}>{name}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={userProfileForm} name="age">
					<CustomControl label="Edad">
						{#snippet children({ props })}
							<input
								{...props}
								type="number"
								bind:value={$userProfileData.age}
								class="w-full"
								placeholder="Edad"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
		</fieldset>

	</ContentBox>
	
	<ContentBox>
		<h3 class="mb-8 border-b border-b-border font-fira text-xl font-semibold">
			{#if data.user.roleId === 2}
			Detalles Profesionales - Instructor
			{:else}
			Detalles Deportivos
			{/if}
		</h3>
	
		<fieldset class="flex w-full flex-col gap-4">
			<div class="formgroup">
				<FormField form={userProfileForm} name="resortId">
					<CustomControl label="Estación" >
						{#snippet children({ props })}
						<select {...props} bind:value={$userProfileData.resortId} class="w-full" placeholder="Selecciona Centro">
							<option value="0">Selecciona Centro</option>
							{#each lists.resorts as { id, resort }}
							<option value={id} aria-label={resort}>{resort}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
					<Description>Sólo indica tu estación principal/favorita. No te limita en nada</Description>
					
				</FormField>
			</div>
			<Fieldset form={userProfileForm} name="sports" class="flex flex-col gap-4">
				<Legend>Selecciona Deporte</Legend>
				<Description>Puedes seleccionar más de uno. En el futuro incluiremos modalidades de cada deporte</Description>
				<div class="flex flex-row items-center justify-start gap-4">
					{#each lists.sports as { id, sport }}
					<Control>
						{#snippet children({ props })}
						<div class="flex flex-col items-center justify-center gap-2">
							<input
							type="checkbox"
							{...props}
							bind:group={$userProfileData.sports}
							value={id}
							class="size-7 sm:size-10 rounded-full border border-border bg-bgNeutral"
							/>
							<Label>{sport}</Label>
						</div>
						{/snippet}
					</Control>
					{/each}
				</div>
				<FieldErrors />
			</Fieldset>
		</fieldset>
	</ContentBox>
	<ContentBox>
		<CoolCTA type="submit" paddingProp="1rem 1.5rem"
		><p class="text-text">Guardar Datos Usuario</p></CoolCTA
		>
	</ContentBox>
</form>
