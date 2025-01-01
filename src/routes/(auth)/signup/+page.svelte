<script lang="ts">
	import { goto } from '$app/navigation';
	import CoolCta from '$src/components/CoolCTA.svelte';
</script>

<p class="mb-2 self-center font-fira text-xl font-semibold text-text">Selecciona Tipo de Cuenta</p>
<CoolCta onClick={() => goto('/signup/customer')} paddingProp="1.2rem" btnWidth="18rem">
	<p class="font-fira text-text dark:text-text">Crear Cuenta de Cliente</p>
</CoolCta>
<CoolCta
	onClick={() => goto('/signup/instructor')}
	paddingProp="1.2rem"
	btnWidth="18rem"
	bgSubtleColor="var(--secondary-washed)"
	highlightColor="var(--secondary-washed)"
	highlightSubtleColor="var(--secondary-washed)"
>
	<p class="font-fira text-text">Crear Cuenta de Instructor</p>
</CoolCta>
