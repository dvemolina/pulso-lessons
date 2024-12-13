<script lang="ts">
	import { page } from '$app/stores';
	import DashboardHeader from '$src/routes/ui/sections/headers/DashboardHeader.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { ScrollArea } from 'bits-ui';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const user = data.user;

	let isMobile = $state(false);
	let sidebarOpen = $state(true);

	const navItems = [
		{
			href: '/dashboard',
			icon: 'pixelarticons:home',
			placeholder: 'Inicio'
		},
		{
			href: '/dashboard/profile',
			icon: 'pixelarticons:user',
			placeholder: 'Perfil'
		},
		{
			href: '/dashboard/services',
			icon: 'pixelarticons:ac',
			placeholder: 'Servicios'
		},
		{
			href: '/dashboard/availability',
			icon: 'pixelarticons:calendar-month',
			placeholder: 'Disponibilidad'
		},
		{
			href: '/dashboard/bookings',
			icon: 'pixelarticons:briefcase-search-1',
			placeholder: 'Reservas'
		},
		{
			href: '/auth/logout',
			icon: 'pixelarticons:close-box',
			placeholder: 'Cerrar Sesión'
		}
	];

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
			if (isMobile) sidebarOpen = false;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		if (isMobile) sidebarOpen = false;
	}

	let activeRoute = $derived($page.url.pathname);
</script>

<div class="fixed flex h-full w-full flex-col bg-neutral-dark text-neutral-light">
	<!-- Header -->
	<DashboardHeader {user} />
	<div class="flex h-full w-full flex-row overflow-hidden">
		<!-- Sidebar -->
		{#if sidebarOpen || !isMobile}
			<div
				class=" z-10 flex h-full flex-col transition-all duration-100 ease-in-out"
				style="width: {isMobile && sidebarOpen ? '100vw' : sidebarOpen ? '16rem' : '4rem'};"
			>
				<aside
					class="relative h-full w-full space-y-6 border-r-[1px] border-r-neutral-light-inactive bg-neutral-dark py-7 text-neutral-light transition-all duration-100 ease-in-out"
				>
					<!-- Navigation Links -->
					<nav class="px-2">
						{#each navItems as { href, icon, placeholder }}
							<a
								onclick={() => {
									if (isMobile) {
										closeSidebar();
									}
								}}
								{href}
								class="flex flex-row {sidebarOpen
									? 'justify-start'
									: 'justify-center'} items-center gap-3 rounded px-4 py-2.5 transition-all duration-100
									{href === '/dashboard'
									? activeRoute === href
										? 'bg-neutral-light-inactive text-neutral-dark'
										: 'hover:bg-neutral-light hover:text-neutral-dark'
									: activeRoute.startsWith(href) && activeRoute !== '/dashboard'
										? 'bg-neutral-light-inactive text-neutral-dark'
										: 'hover:bg-neutral-light hover:text-neutral-dark'}"
							>
								<iconify-icon class="icon" {icon}></iconify-icon>
								{#if sidebarOpen || isMobile}
									<span>{placeholder}</span>
								{/if}
							</a>
						{/each}
					</nav>
					{#if !isMobile && !sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class="bg-tansparent absolute bottom-7 right-4 flex items-center justify-center rounded p-1 text-neutral-light transition-all duration-100 hover:bg-neutral-light hover:text-neutral-dark"
						>
							<iconify-icon class="icon" icon="pixelarticons:forwardburger"></iconify-icon>
						</button>
					{/if}
					{#if !isMobile && sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class="bg-tansparent absolute bottom-7 right-4 flex items-center justify-center rounded p-1 text-neutral-light transition-all duration-100 hover:bg-neutral-light hover:text-neutral-dark"
						>
							<iconify-icon class="icon" icon="pixelarticons:backburger"></iconify-icon>
						</button>
					{/if}
					{#if isMobile && sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class="bg-tansparent absolute right-4 flex items-center justify-center rounded p-1 text-neutral-light transition-all duration-200 hover:bg-neutral-light hover:text-neutral-dark"
						>
							<iconify-icon class="icon" icon="pixelarticons:backburger"></iconify-icon>
						</button>
					{/if}
				</aside>
			</div>
		{/if}
		<!-- Main content area -->
		<main
			class="flex h-full w-full flex-col bg-transparent {isMobile
				? 'p-5'
				: 'p-10'} transition-all duration-100 ease-in-out
				{isMobile && sidebarOpen ? 'hidden' : 'flex'}
				"
		>
			{#if isMobile && !sidebarOpen}
				<button
					onclick={toggleSidebar}
					class="flex w-fit flex-row content-center items-center pb-3"
				>
					<iconify-icon icon="pixelarticons:menu" width="1.5rem"></iconify-icon>
					MENU
				</button>
			{/if}
			<div class="min-h-[100px] w-full flex-grow">
				<ScrollArea.Root class="relative h-full">
					<ScrollArea.Viewport class="h-full w-full {isMobile ? 'px-2' : 'px-10'}">
							{@render children?.()}
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation="vertical"
						class="hover:bg-dark-10 flex h-full w-2.5 touch-none select-none rounded-full border-x border-x-black bg-neutral-gray p-px transition-all hover:w-3"
					>
						<ScrollArea.Thumb
							class="relative flex-1 rounded-full bg-neutral-light opacity-30 transition-opacity hover:opacity-100"
						/>
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner />
				</ScrollArea.Root>
			</div>
		</main>
	</div>
</div>

<!-- Styles -->
<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.icon {
		font-size: 1.5rem;
	}
</style>
