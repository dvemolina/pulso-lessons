<script lang="ts">
	import AvatarMenu from '$src/components/AvatarMenu.svelte';
	import FormField from './FormField.svelte';
	import ModeSwitch from './ModeSwitch.svelte';

	interface Props {
		user: any;
	}

	let { user }: Props = $props();
</script>

<header
	class="flex w-full flex-row items-center justify-between border-b-2 border-b-border bg-background px-8 py-3 md:px-20"
>
	<a href="/">
		<img class="max-w-[90px]" src="/pulso.png" alt="Pulso de Nieve" />
	</a>
	<form action="" method="GET">
		
	</form>
	<div class="flex flex-row gap-4">
		<AvatarMenu userName={user.name} src={user.profileImage} />
		<ModeSwitch />
	</div>
</header>
