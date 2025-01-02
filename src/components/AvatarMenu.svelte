<script lang="ts">
	import { Avatar } from 'bits-ui';
	import { LinkPreview } from 'bits-ui';
	import { fade } from 'svelte/transition';
	
	let { user } = $props();

	const linkList = [
		{ href: `/profile/${user?.id}`, label: 'Mi Perfil' },
		{ href: '/dashboard', label: 'Panel Control'},
		{ href: '/logout', label: 'Desconectar'}
	];

	let userInitial = $derived(user?.name.charAt(0));
</script>

<LinkPreview.Root openDelay={0}>
	<LinkPreview.Trigger href="/dashboard">
		<Avatar.Root class="border-2 border-border hover:border-borderActive rounded-full overflow-hidden size-10 flex flex-row justify-center items-center">
			<Avatar.Image src={user.profileImage} alt="Imagen Perfil {user.name}" class="object-cover object-center"/>
			<Avatar.Fallback><p class="avatar-fallback">{userInitial || '+'}</p></Avatar.Fallback>
		</Avatar.Root>
	</LinkPreview.Trigger>
	<LinkPreview.Content sideOffset={8} class="z-20 bg-background border-2 border-border rounded-md" >
		<ul class="link-list" transition:fade={{ duration: 300 }}>
			{#each linkList as { href, label }}
				<li class="list-item">
					{#if href === "/logout"}
						<!-- Logout as form submission to avoid prefetching -->
						<form action={href} method="POST" class="w-full">
							<button type="submit" class="link">{label}</button>
						</form>
					{:else}
						<a 
							class="link" 
							href={href} 
						>
							{label}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</LinkPreview.Content>
</LinkPreview.Root>

<style>
    .avatar-fallback {
        padding: 0.1rem 0.6rem;
        text-align: center;
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
