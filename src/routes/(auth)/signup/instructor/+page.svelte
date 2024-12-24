<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import { countryPrefix } from '$src/lib/utils/utils';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	let step = $state(1);
	const lastStep = 5;
	let userId = $state();

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
				step = 2;
				console.log(`The userId has been changed to: ${userId} and the Step is now ${step}`);
			}
		}
	});
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
			<CoolCta type="submit">Crear Cuenta</CoolCta>
			<a href="/signup/customer" class="self-center text-textNeutral hover:text-text">Soy Cliente</a
			>
		</div>
	</form>
{:else if step === 2}
	Upload Qualification
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
