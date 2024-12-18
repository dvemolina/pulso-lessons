<script lang="ts">
	import { page } from '$app/stores';
	import CoolCta from '$src/components/CoolCTA.svelte';
	import CustomControl from '$src/components/CustomControl.svelte';
	import FormField from '$src/components/FormField.svelte';
	import GoogleBtn from '$src/components/GoogleBtn.svelte';
	import { userLoginSchema } from '$src/features/Users/lib/userValidations.js';
	import { superForm, superValidate } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const loginForm = superForm(data.form, {
		validators: zodClient(userLoginSchema)
	});

	const { form, enhance } = loginForm;

	let redirectMessage: string = $derived($page.url.searchParams.get('redirectMessage') ?? '');
</script>

<form action="" method="post" class="flex flex-col gap-4">
	<div class="flex flex-col gap-6">
		{#if redirectMessage}
			<div class="rounded-md border border-border bg-primaryWashed px-2 py-4">
				<p class="text-text">{redirectMessage}</p>
			</div>
		{/if}
		<p class="self-center font-fira text-xl font-semibold text-text">Accede a tu Cuenta</p>
		<fieldset class="flex flex-col gap-2">
			<FormField form={loginForm} name="email">
				<CustomControl hiddenLabel={true} label="Email">
					{#snippet children({ props })}
						<input bind:value={$form.email} type="text" {...props} placeholder="Introduce Email" class="w-full"/>
					{/snippet}
				</CustomControl>
			</FormField>

			<FormField form={loginForm} name="password">
				<CustomControl hiddenLabel={true} label="Contraseña">
					{#snippet children({ props })}
						<input
							bind:value={$form.password}
							type="password"
							{...props}
							placeholder="Introduce Contraseña"
							class="w-full"
						/>
					{/snippet}
				</CustomControl>
			</FormField>
		</fieldset>
	</div>
	<CoolCta type="submit">Acceder</CoolCta>
</form>
<GoogleBtn>Acceder con Cuenta Google</GoogleBtn>
<a href="/signup" class="text-textNeutral hover:text-text">No tengo Cuenta</a>
<a href="/recover-password" class="text-textNeutral hover:text-text">Recuperar Contraseña</a>
