<script lang="ts">
	import { Avatar } from 'bits-ui';
	import { LinkPreview } from 'bits-ui';
	import { fade } from 'svelte/transition';
	interface Props {
		src: any;
		userName: any;
	}

	let { src, userName }: Props = $props();

	const linkList = [
		{ href: '/profile', label: 'Mi Perfil' },
		{ href: '/dashboard', label: 'Panel Control' },
		{ href: '/logout', label: 'Desconectar' }
	];

	let userInitial = $derived(userName.charAt(0));
</script>

<LinkPreview.Root openDelay={0}>
	<LinkPreview.Trigger href="/dashboard">
		<Avatar.Root class="border-2 border-border hover:border-borderActive rounded-full overflow-hidden size-10 flex flex-row justify-center items-center">
			<Avatar.Image src={src} alt="Imagen Perfil {userName}" class="object-cover object-center"/>
			<Avatar.Fallback><p class="avatar-fallback">{userInitial || '+'}</p></Avatar.Fallback>
		</Avatar.Root>
	</LinkPreview.Trigger>
	<LinkPreview.Content sideOffset={8} class="z-20 bg-background border-2 border-border rounded-md" >
		<ul class="link-list" transition:fade={{ duration: 300 }}>
			{#each linkList as { href, label }}
				<li class="list-item">
					<a class="link" {href}>{label}</a>
				</li>
			{/each}
		</ul>
	</LinkPreview.Content>
</LinkPreview.Root>

<style>
    .avatar-fallback {
        padding: 0.1rem 0.6rem;
        text-align: center
    }

	.link-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
        gap: 1rem;
        padding: 1rem;
	}

	.link {
		color: var(--text-neutral);
        transition: all 0.1s ease-in-out;
	}

	.link:hover,
	.link:focus {
		color: var(--text);
	}

    
</style>
