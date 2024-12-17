<script lang="ts">
	import AvatarMenu from '$src/components/AvatarMenu.svelte';

	interface Props {
		user: any;
	}

	let { user }: Props = $props();
</script>

<header
	class="flex w-full flex-row items-center justify-between border-b-[1px] border-b-neutral-light-inactive px-20 py-3"
>
	<a href="/">
		<img class="max-w-[90px]" src="/pulso.png" alt="Pulso de Nieve" />
	</a>

	<AvatarMenu userName={user.name} src={user.profileImage} />
</header>