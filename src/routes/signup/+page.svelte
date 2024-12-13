<script lang="ts">
	import { goto } from '$app/navigation';
	import CoolCta from '$src/components/CoolCTA.svelte';
</script>

<div class="flex flex-col  items-center justify-center gap-5 bg-background border border-border rounded-md p-11">
	<p class="self-center mb-5 font-fira text-lg font-semibold text-text">Selecciona Tipo de Cuenta</p>
	<CoolCta
		onClick={() => goto('/signup/customer')}
		paddingProp="1.2rem"
		btnWidth="18rem"
		fontWeight="500"
	>
		<p class="font-fira text-text">Crear Cuenta de Cliente</p>
	</CoolCta>
	<CoolCta
		onClick={() => goto('/signup/instructor')}
		paddingProp="1.2rem"
		btnWidth="18rem"
		fontWeight="500"
		bgColor=""
		bgSubtleColor="var(--secondary-washed)"
		highlightColor="var(--secondary-washed)"
		highlightSubtleColor="var(--secondary-washed)"
	>
		<p class="font-fira text-text">Crear Cuenta de Instructor</p>
	</CoolCta>
</div>

<form action=""></form>
