<script lang="ts">
	let { data } = $props();
</script>

<div class="flex max-w-96 flex-col items-center justify-center gap-6">
	<p class="font-fira text-2xl font-semibold text-text">Cuenta creada {data.user?.name}!</p>
	{#if data.user?.roleId === 1}
		<p class="text-lg font-sans text-text">
			Nos encanta verte con nosotros! En breves recibirás un correo de bienvenida confirmando la creación de tu cuenta. Navega a tu
			Dashboard para gestionar tu perfil, busca y realiza alguna reserva o conoce más sobre Pulso:
		</p>
    {:else if data.user?.roleId === 2}
    <p class="text-lg  font-sans text-text">
        Vamos a revisar tus datos y titulación! Si todo está correcto recibirás un correo de aceptación y cambio de cuenta a Cuenta Profesional. Por ahora deberías haber recibido un correo de bienvenida. Mientras confirmamos tu titulación puedes navegar a tu
        Dashboard para gestionar tu perfil, buscar y realizar alguna reserva o conocer más sobre Pulso:
    </p>
	{/if}
	<div class="flex flex-row gap-3">
		<a href="/dashboard" class="text-lg text-textNeutral hover:text-text focus:text-text">
			Dashboard
		</a>
		<a href="/pulso" class="text-lg text-textNeutral hover:text-text focus:text-text">
			Encuentra Clase
		</a>
		<a href="/nosotros" class="text-lg text-textNeutral hover:text-text focus:text-text">
			Conócenos
		</a>
	</div>
</div>
