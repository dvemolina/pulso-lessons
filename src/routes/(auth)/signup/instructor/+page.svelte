<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import { countryPrefix } from '$src/lib/utils';
</script>

	<form action="" method="post" class="flex flex-col gap-8">
		<div class="flex flex-col">
			<p class="mb-5 self-center font-fira text-xl font-semibold text-text">
				Sube tu Certificado/Titulación
			</p>
			<input
				aria-label="Titulación Profesional"
				type="file"
				name="qualification"
				id="qualification"
				placeholder="Documento Titulación"
			/>
		</div>

		<div class="flex flex-col">
			<p class="mb-5 self-center font-fira text-xl font-semibold text-text">Rellena Tus Datos</p>
			<div class="flex flex-col gap-2 sm:gap-6">
				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<input type="text" name="name" id="name" placeholder="Nombre" class="w-full" />
					<input type="text" name="surname" id="surname" placeholder="Apellido" class="w-full" />
				</div>

				<input type="email" name="email" id="email" placeholder="Email" class="w-full" />
				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<input type="password" name="password" id="password" placeholder="Contraseña" />
					<input
						type="password"
						name="repeat_pwd"
						id="repeat_pwd"
						placeholder="Confirmar Contraseña"
					/>
				</div>

				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<select name="country_code" id="country_code" class="w-full">
						<option value="">Prefijo País</option>
						{#each countryPrefix as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</select>
					<input type="number" name="phone" id="phone" placeholder="Teléfono" class="w-full" />
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<CoolCta type="submit">Crear Cuenta</CoolCta>
			<a href="/signup/customer" class="self-center text-textNeutral hover:text-text">Soy Cliente</a
			>
		</div>
	</form>
