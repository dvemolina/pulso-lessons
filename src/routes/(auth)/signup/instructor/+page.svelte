<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import { countryPrefix } from '$src/lib/utils/utils';
	import { Control, Description, FieldErrors, Fieldset, Label, Legend } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { createUploadThing } from "$lib/utils/uploadthing";
	
	const { startUpload } = createUploadThing("qualificationFile", {
		onClientUploadComplete: () => {
			alert("Upload Completed");
		},
		onUploadError: (e: Error) => {
			console.error('Error uploading qualification document', e.message)
			alert("Error al subir el archivo! Intenta de nuevo!")
		}
	});
	
	let { data } = $props();

	const timeUnits = [
		{ value: 'hour', label: 'Hora' },
		{ value: 'day', label: 'Día' }
	];
	const pricingMode = [
		{ value: 1, label: 'Precio Fijo' },
		{ value: 2, label: 'Precio x UT' },
		{ value: 3, label: 'Precio x Alumno' }
	];

	let step = $state(3);
	let userId = $state();
	let userName = $state(data.user?.name);

	const {
		form: signupForm,
		enhance: signupEnhance,
		constraints: signupConstraints,
		message: signupMessage,
		errors: signupErrors
	} = superForm(data.signupForm, {
		onUpdate({ form, result }) {
			if (form.valid && result.data.userId) {
				userId = result.data.userId;
				userName = result.data.userName;
				step = 2;
				console.log(`The userId has been changed to: ${userId}, and the Step is now ${step}`);
			}
		}
	});

	const lessonBasicsForm = superForm(data.lessonBasicsForm, {
		onUpdate({ form, result }) {
			if (form.valid && result.type === 'success') {
				console.log('THE USER ON SUBMIT IS: ', userName);
				step = 3;
				console.log(`The Lesson Basics has been created. The Step is now ${step}`);
			}
		}
	});
	const { form: lessonBasicsData, enhance: lessonBasicsEnhance } = lessonBasicsForm;
</script>

{#if step === 1}
	<form action="?/signup" method="post" class="flex flex-col gap-8" use:signupEnhance>
		<div class="flex flex-col">
			<p class="mb-5 self-center text-center font-fira text-xl font-semibold text-text">
				Rellena Tus Datos. <br />
				<span class="text-lg font-normal text-textNeutral underline"
					>Prepara tu titulación en PDF,<br /> te la pediremos al final.</span
				>
			</p>
			<div class="flex flex-col gap-2 sm:gap-6">
				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<div class="form-unit">
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Nombre"
							aria-label="Nombre"
							class="w-full"
							bind:value={$signupForm.name}
							aria-invalid={$signupErrors.name ? 'true' : undefined}
							{...$signupConstraints.name}
						/>
						<p class="field-error">{$signupErrors.name}</p>
					</div>
					<div class="form-unit">
						<input
							type="text"
							name="surname"
							id="surname"
							placeholder="Apellido"
							aria-label="Apellido"
							class="w-full"
							bind:value={$signupForm.surname}
							aria-invalid={$signupErrors.surname ? 'true' : undefined}
							{...$signupConstraints.surname}
						/>
						<p class="field-error">{$signupErrors.surname}</p>
					</div>
				</div>

				<div class="form-unit">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						aria-label="Email"
						class="w-full"
						bind:value={$signupForm.email}
						aria-invalid={$signupErrors.email ? 'true' : undefined}
						{...$signupConstraints.email}
					/>
					<p class="field-error">{$signupErrors.email}</p>
				</div>
				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<div class="form-unit">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Contraseña"
							aria-label="Contraseña"
							bind:value={$signupForm.password}
							aria-invalid={$signupErrors.password ? 'true' : undefined}
							{...$signupConstraints.password}
						/>
						<p class="field-error">{$signupErrors.password}</p>
					</div>
					<div class="form-unit">
						<input
							type="password"
							name="confirm_password"
							id="confirm_password"
							placeholder="Confirmar Contraseña"
							aria-label="Confirmar Contraseña"
							bind:value={$signupForm.confirm_password}
							aria-invalid={$signupErrors.confirm_password ? 'true' : undefined}
							{...$signupConstraints.confirm_password}
						/>
						<p class="field-error">{$signupErrors.confirm_password}</p>
					</div>
				</div>

				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<div class="form-unit">
						<select
							name="country_code"
							id="country_code"
							class="w-full"
							aria-label="Prefijo País"
							bind:value={$signupForm.country_code}
							aria-invalid={$signupErrors.country_code ? 'true' : undefined}
							{...$signupConstraints.country_code}
						>
							<option value="">Prefijo País</option>
							{#each countryPrefix as { value, label }}
								<option {value}>{label}</option>
							{/each}
						</select>
						<p class="field-error w-full">{$signupErrors.country_code}</p>
					</div>
					<div class="form-unit">
						<input
							type="number"
							name="phone"
							id="phone"
							placeholder="Teléfono"
							aria-label="Teléfono"
							class="w-full"
							bind:value={$signupForm.phone}
							aria-invalid={$signupErrors.phone ? 'true' : undefined}
							{...$signupConstraints.phone}
						/>
						<p class="field-error">{$signupErrors.phone}</p>
					</div>
				</div>
			</div>
			{#if $signupMessage}
				<h3 class="self-center font-fira text-lg font-semibold text-error">{$signupMessage}</h3>
			{/if}
		</div>
		<div class="flex flex-col gap-4">
			<CoolCta type="submit">Siguiente</CoolCta>
			<a href="/signup/customer" class="self-center text-textNeutral hover:text-text">Soy Cliente</a
			>
		</div>
	</form>
{:else if step === 2}
	<p class="mb-5 self-center text-center font-fira text-xl font-semibold text-text">
		Vamos a crear tus Datos de Servicio Básicos <br />
		<span class="text-lg font-normal text-textNeutral"
			>Se pueden modificar más tarde en tu Dashboard</span
		>
	</p>
	<form action="?/lessonBasics" method="post" class="flex flex-col gap-10" use:lessonBasicsEnhance>
		<input type="hidden" name="title" value="Clase con {userName}" />
		<input
			type="hidden"
			name="description"
			value="Aprende con seguridad y garantía de éxito, de la mano de un profesional experimentado como {userName}"
		/>
		<fieldset class="flex w-full flex-col gap-4">
			<h3 class="mb-2 border-b border-b-border font-fira text-xl font-normal">General</h3>
			<FormField form={lessonBasicsForm} name="resortId">
				<CustomControl label="Estación">
					{#snippet children({ props })}
						<select
							{...props}
							bind:value={$lessonBasicsData.resortId}
							placeholder="Selecciona Centro"
						>
							{#each data.resorts as { id, resort }}
								<option value={id} aria-label={resort}>{resort}</option>
							{/each}
						</select>
					{/snippet}
				</CustomControl>
			</FormField>
			<Fieldset form={lessonBasicsForm} name="sports" class="flex flex-col gap-4">
				<Legend>Selecciona Deporte</Legend>
				<Description
					>Puedes seleccionar más de uno. En el futuro incluiremos modalidades de cada deporte</Description
				>
				<div class="flex flex-row items-center justify-start gap-4">
					{#each data.sports as { id, sport }}
						<Control>
							{#snippet children({ props })}
								<div class="flex flex-col items-center justify-center gap-2">
									<input
										type="checkbox"
										{...props}
										bind:group={$lessonBasicsData.sports}
										value={id}
										class="size-7 rounded-full border border-border bg-bgNeutral sm:size-10"
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
		<fieldset class="flex w-full flex-col gap-4">
			<div class="flex flex-col gap-1">
				<h3 class="mb-2 border-b border-b-border font-fira text-xl font-normal">Duración</h3>
				<p class="text-md mb-5 font-fira font-normal text-textNeutral">
					Genera los bloques mínimos/máximo de reserva. Cantidad de horas/días que se puede reservar
					tu lección.
				</p>
			</div>
			<div class="formgroup">
				<FormField form={lessonBasicsForm} name="timeUnit">
					<CustomControl label="Unidad de Tiempo (UT)">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.timeUnit}
								placeholder="Selecciona Tipo Unidad de Tiempo"
							>
								{#each timeUnits as { value, label }}
									<option {value} aria-label={label}>{label}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="minTimeUnit">
					<CustomControl label="Cantidad Mínima de UT">
						{#snippet children({ props })}
							<input
								type="number"
								min="1"
								{...props}
								bind:value={$lessonBasicsData.minTimeUnit}
								placeholder="Introduce Mínimo de UT"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="maxTimeUnit">
					<CustomControl label="Cantidad Máxima de UT">
						{#snippet children({ props })}
							<input
								type="number"
								min="0"
								{...props}
								bind:value={$lessonBasicsData.maxTimeUnit}
								placeholder="Introduce Máximo de UT"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
		</fieldset>

		<fieldset class="flex w-full flex-col gap-4">
			<h3 class="mb-5 border-b border-b-border font-fira text-xl font-normal">Alumnos</h3>
			<div class="formgroup">
				<FormField form={lessonBasicsForm} name="minStudents">
					<CustomControl label="Cantidad Mínima de Alumnos">
						{#snippet children({ props })}
							<input
								type="number"
								min="1"
								{...props}
								bind:value={$lessonBasicsData.minStudents}
								placeholder="Introduce Mínimo de Alumnos"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="maxStudents">
					<CustomControl label="Cantidad Máxima de Alumnos">
						{#snippet children({ props })}
							<input
								type="number"
								min="0"
								{...props}
								bind:value={$lessonBasicsData.maxStudents}
								placeholder="Introduce Máximo de Alumnos"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
			<div class="formgroup">
				<FormField form={lessonBasicsForm} name="minSkillId">
					<CustomControl label="Nivel de Habilidad Mínimo">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.minSkillId}
								placeholder="Selecciona Nivel de Habilidad"
							>
								<option value="">Selecciona Nivel de Habilidad</option>
								{#each data.skillLevels as { id, skillLevel }}
									<option value={id} aria-label={skillLevel}>{skillLevel}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="maxSkillId">
					<CustomControl label="Nivel de Habilidad Máximo">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.maxSkillId}
								placeholder="Selecciona Nivel de Habilidad"
							>
								<option value="">Selecciona Nivel de Habilidad</option>
								{#each data.skillLevels as { id, skillLevel }}
									<option value={id} aria-label={skillLevel}>{skillLevel}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
			<div class="formgroup">
				<FormField form={lessonBasicsForm} name="minAgeGroupId">
					<CustomControl label="Grupo de Edad Mínimo">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.minAgeGroupId}
								placeholder="Selecciona Grupo de Edad"
							>
								<option value="">Selecciona Grupo de Edad</option>
								{#each data.ageGroups as { id, ageGroup, minAge, maxAge }}
									<option value={id} aria-label={ageGroup}>{ageGroup} ({minAge} - {maxAge})</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="maxAgeGroupId">
					<CustomControl label="Grupo de Edad Máximo">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.maxAgeGroupId}
								placeholder="Selecciona Grupo de Edad"
							>
								<option value="">Selecciona Grupo de Edad</option>
								{#each data.ageGroups as { id, ageGroup, minAge, maxAge }}
									<option value={id} aria-label={ageGroup}>{ageGroup} ({minAge} - {maxAge})</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
		</fieldset>
		<fieldset class="flex w-full flex-col gap-4">
			<h3 class="mb-5 border-b border-b-border font-fira text-xl font-normal">Precio Base</h3>
			<div class="formgroup">
				<FormField form={lessonBasicsForm} name="pricingModeId">
					<CustomControl label="Modalidad de precio">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.pricingModeId}
								placeholder="Selecciona Modalidad de Precio"
							>
								{#each pricingMode as { value, label }}
									<option {value} aria-label={label}>{label}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="currencyId">
					<CustomControl label="Divisa Principal">
						{#snippet children({ props })}
							<select
								{...props}
								bind:value={$lessonBasicsData.currencyId}
								placeholder="Selecciona la Divisa"
							>
								{#each data.currencies as { id, code, currency }}
									<option value={id} aria-label={currency}>{code} - {currency}</option>
								{/each}
							</select>
						{/snippet}
					</CustomControl>
				</FormField>
				<FormField form={lessonBasicsForm} name="basePrice">
					<CustomControl label="Precio Base">
						{#snippet children({ props })}
							<input
								type="number"
								min="0"
								{...props}
								bind:value={$lessonBasicsData.basePrice}
								placeholder="Introduce el Precio Base"
							/>
						{/snippet}
					</CustomControl>
				</FormField>
			</div>
		</fieldset>
		<CoolCta type="submit">Siguiente</CoolCta>
	</form>
{:else if step === 3}
	<p class="mb-5 self-center text-center font-fira text-xl font-semibold text-text">
		Sube tu Titulación Profesional <br />
		<span class="text-lg font-normal text-textNeutral"
			>Nuestro equipo la comprobará para poder aceptar tu solicitud</span
		>
	</p>
	<div class="flex flex-col">
		<input
			type="file"
			onchange={async (e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;
				// Do something with files
				// Then start the upload
				await startUpload([file]);
			}}
		/>
	</div>
{/if}

<style>
	.form-unit {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1px;
		width: 100%;
	}

	.field-error {
		position: absolute;
		bottom: -22px;
		left: 3px;
		font-family: 'Fira Sans';
		font-size: 0.8rem;
		color: var(--error);
	}
</style>
