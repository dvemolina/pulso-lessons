<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import GoogleBtn from '$src/components/GoogleBtn.svelte';
	import { countryPrefix } from '$src/lib/utils/utils.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, constraints, message, errors } = superForm(data.form);
</script>

<form action="" method="post" class="flex flex-col gap-10" use:enhance>
	<div class="flex flex-col">
		<p class="mb-5 self-center font-fira text-xl font-semibold text-text">Rellena Tus Datos</p>
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
					bind:value={$form.name}
					aria-invalid={$errors.name ? 'true' : undefined}
					{...$constraints.name}
					/>
					<p class="field-error">{$errors.name}</p>
				</div>
				<div class="form-unit">
					<input
					type="text"
					name="surname"
					id="surname"
					placeholder="Apellido"
					aria-label="Apellido"
					class="w-full"
					bind:value={$form.surname}
					aria-invalid={$errors.surname ? 'true' : undefined}
					{...$constraints.surname}
					/>
					<p class="field-error">{$errors.surname}</p>
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
				bind:value={$form.email}
				aria-invalid={$errors.email ? 'true' : undefined}
				{...$constraints.email}
				/>
				<p class="field-error">{$errors.email}</p>
			</div>
			<div class="flex w-full flex-col gap-2 sm:flex-row">
				<div class="form-unit">
					<input
					type="password"
					name="password"
					id="password"
					placeholder="Contraseña"
					aria-label="Contraseña"
					bind:value={$form.password}
					aria-invalid={$errors.password ? 'true' : undefined}
					{...$constraints.password}
						/>
						<p class="field-error">{$errors.password}</p>
					</div>
					<div class="form-unit">
						<input
						type="password"
						name="confirm_password"
						id="confirm_password"
						placeholder="Confirmar Contraseña"
						aria-label="Confirmar Contraseña"
						bind:value={$form.confirm_password}
						aria-invalid={$errors.confirm_password ? 'true' : undefined}
						{...$constraints.confirm_password}
						/>
						<p class="field-error">{$errors.confirm_password}</p>
					</div>
				</div>

				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<div class="form-unit">
						<select
							name="country_code"
							id="country_code"
							class="w-full"
							aria-label="Prefijo País"
							bind:value={$form.country_code}
							aria-invalid={$errors.country_code ? 'true' : undefined}
							{...$constraints.country_code}
							>
							<option value="">Prefijo País</option>
							{#each countryPrefix as { value, label }}
							<option {value}>{label}</option>
							{/each}
						</select>
						<p class="field-error">{$errors.country_code}</p>
					</div>
					<div class="form-unit">
						<input
						type="number"
						name="phone"
						id="phone"
						placeholder="Teléfono"
						aria-label="Teléfono"
						class="w-full"
						bind:value={$form.phone}
						aria-invalid={$errors.phone ? 'true' : undefined}
						{...$constraints.phone}
						/>
						<p class="field-error">{$errors.phone}</p>
					</div>
				</div>
			</div>
			{#if $message}
				<h3 class="self-center font-fira text-lg font-semibold text-error">{$message}</h3>
			{/if}
		</div>
		<div class="flex flex-col items-center gap-4">
			<GoogleBtn>Acceder con Cuenta Google</GoogleBtn>
			<CoolCta type="submit">Crear Cuenta</CoolCta>
			<a href="/signup/instructor" class="text-textNeutral hover:text-text">Soy Instructor</a>
		</div>
</form>

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
