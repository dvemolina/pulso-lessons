<script lang="ts">
	import { page } from '$app/stores';
	import DashboardHeader from '$src/components/DashboardHeader.svelte';
	import { onMount } from 'svelte';
	import { ScrollArea } from 'bits-ui';

	let { data, children } = $props();

	let isMobile = $state(false);
	let sidebarOpen = $state(true);

	const navItems = [
		{
			href: '/dashboard',
			icon: '/svg/home.svg',
			placeholder: 'Inicio'
		},
		{
			href: '/dashboard/profile',
			icon: '/svg/user.svg',
			placeholder: 'Perfil'
		},
		{
			href: '/dashboard/services',
			icon: '/svg/snowflake.svg',
			placeholder: 'Servicios'
		},
		{
			href: '/dashboard/availability',
			icon: '/svg/calendar.svg',
			placeholder: 'Disponibilidad'
		},
		{
			href: '/dashboard/bookings',
			icon: '/svg/briefcase.svg',
			placeholder: 'Reservas'
		},
		{
			href: '/logout',
			icon: '/svg/close.svg',
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

<div class="fixed flex h-full w-full flex-col">
	<!-- DashboardHeader -->
	<DashboardHeader user={data.user} />
	<div class="flex h-full w-full flex-row overflow-hidden">
		<!-- Sidebar -->
		{#if sidebarOpen || !isMobile}
			<div
				class=" z-10 flex h-full flex-col transition-all duration-100 ease-in-out"
				style="width: {isMobile && sidebarOpen ? '100vw' : sidebarOpen ? '16rem' : '4rem'};"
			>
				<aside
					class="relative h-full w-full space-y-6 border-r-2 border-r-border bg-background py-7 text-text transition-all duration-100 ease-in-out"
				>
					<!-- Navigation Links -->
					<nav class="px-2">
						{#each navItems as { href, icon, placeholder }}
							{#if href === '/logout'}
								<!-- Logout link with form styling -->
								<form
									action="/logout"
									method="POST"
									class="flex flex-row font-fira {sidebarOpen
										? 'justify-start'
										: 'justify-center'} items-center gap-3 rounded px-2 py-2.5 transition-all duration-100
					{activeRoute === href
										? 'bg-primaryWashed'
										: 'text-text opacity-80 hover:bg-primaryWashed hover:opacity-100'}"
								>
									<button
										type="submit"
										class="flex w-full flex-row items-center gap-3 text-left"
										onclick={() => {
											if (isMobile) {
												closeSidebar();
											}
										}}
									>
										<img src={icon} alt={placeholder} class="w-5 invert-0 dark:invert" />
										{#if sidebarOpen || isMobile}
											<span>{placeholder}</span>
										{/if}
									</button>
								</form>
							{:else}
								<!-- Regular navigation links -->
								<a
									onclick={() => {
										if (isMobile) {
											closeSidebar();
										}
									}}
									{href}
									class="flex flex-row font-fira {sidebarOpen
										? 'justify-start'
										: 'justify-center'} items-center gap-3 rounded px-2 py-2.5 transition-all duration-100
					{href === '/dashboard'
										? activeRoute === href
											? 'bg-primaryWashed'
											: 'text-text opacity-80 hover:bg-primaryWashed hover:opacity-100'
										: activeRoute.startsWith(href) && activeRoute !== '/dashboard'
											? 'bg-primaryWashed'
											: 'text-text opacity-80 hover:bg-primaryWashed hover:opacity-100'}"
								>
									<img src={icon} alt={placeholder} class="w-5 invert-0 dark:invert" />
									{#if sidebarOpen || isMobile}
										<span>{placeholder}</span>
									{/if}
								</a>
							{/if}
						{/each}
					</nav>
					{#if !isMobile && !sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class="absolute bottom-7 right-4 flex items-center justify-center rounded p-1 transition-all duration-100"
						>
							<img
								src="/svg/forwardburger.svg"
								alt="Abrir Barra Lateral"
								class="invert-0 dark:invert"
							/>
						</button>
					{/if}
					{#if !isMobile && sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class=" absolute bottom-7 right-4 flex items-center justify-center rounded p-1 transition-all duration-100"
						>
							<img
								src="/svg/backburger.svg"
								alt="Abrir Barra Lateral"
								class="invert-0 dark:invert"
							/>
						</button>
					{/if}
					{#if isMobile && sidebarOpen}
						<button
							aria-label="Sidebar"
							onclick={toggleSidebar}
							class="bg-tansparent text-neutral-light hover:bg-neutral-light hover:text-neutral-dark absolute right-4 flex items-center justify-center rounded p-1 transition-all duration-200"
						>
							<img
								src="/svg/backburger.svg"
								alt="Abrir Barra Lateral"
								class="invert-0 dark:invert"
							/>
						</button>
					{/if}
				</aside>
			</div>
		{/if}
		<!-- Main content area -->
		<main
			class="flex h-full w-full flex-col bg-transparent dark:bg-neutral-900/70 {isMobile
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
					<img src="/svg/menu-dots.svg" alt="Menu" class="invert-0 dark:invert" />
				</button>
			{/if}
			<div class="min-h-[100px] w-full flex-grow">
				<ScrollArea.Root class="relative h-full">
					<ScrollArea.Viewport class="h-full w-full {isMobile ? 'px-2' : 'px-10'}">
						{@render children?.()}
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation="vertical"
						class="flex h-full w-2 touch-none select-none rounded-full border-x border-x-border bg-transparent transition-all hover:w-2.5 hover:cursor-pointer hover:bg-bgNeutral"
					>
						<ScrollArea.Thumb
							class="relative flex-1 rounded-full bg-textNeutral opacity-30 transition-opacity hover:opacity-100"
						/>
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner />
				</ScrollArea.Root>
			</div>
		</main>
	</div>
</div>
