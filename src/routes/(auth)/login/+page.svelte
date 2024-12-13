<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import GoogleBtn from '$src/components/GoogleBtn.svelte';
</script>

<form action="" method="post" class="flex flex-col gap-8">
	<div class="flex flex-col gap-6">
		<p class="self-center font-fira text-xl font-semibold text-text">Accede a tu Cuenta</p>
		<div class="flex flex-col gap-5">
			<input type="email" name="email" id="email" placeholder="Email" class="w-full" />
			<input type="password" name="password" id="password" placeholder="Contraseña" />
		</div>
	</div>
	<div class="flex flex-col items-center gap-4">
		<GoogleBtn>Acceder con Cuenta Google</GoogleBtn>
		<CoolCta type="submit">Acceder</CoolCta>
		<a href="/signup" class="text-textNeutral hover:text-text">No tengo Cuenta</a>
		<a href="/recover-password" class="text-textNeutral hover:text-text">Recuperar Contraseña</a>
	</div>
</form>
