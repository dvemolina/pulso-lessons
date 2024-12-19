<script lang="ts">
	
	import ShinyCta from '$src/components/CoolCTA.svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import AvatarMenu from './AvatarMenu.svelte';
	import ModeSwitch from './ModeSwitch.svelte';

	interface Props {
		user?: any;
		isSolid?: boolean;
	}

	let { user, isSolid = false }: Props = $props();

	let isMobile: boolean | undefined = $state();
	let openDropdown: string | null = $state(null);
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	const navItems = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Pulso', href: '/pulso' },
		{
			name: 'Nosotros',
			href: '/about',
			dropdown: [
				{ name: 'Instructores', href: 'about/instructors' },
				{ name: 'Sobre Pulso', href: '/about/us' },
				{ name: 'Misión', href: '/about/mission' }
			]
		},
		{
			name: 'Registrarse',
			href: '/signup'
		}
	];

	const socialIcons = [
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/your-profile',
			src: '/svg/linkedin.svg'
		},
		{
			name: 'Instagram',
			href: 'https://instagram.com/your-profile',
			src: '/svg/instagram.svg'
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/your-profile',
			src: '/svg/x-twitter.svg'
		}
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			isScrolled = true;
		} else if (window.scrollY === 0) {
			isScrolled = false;
		}
	}

	function toggleDropdown(event: Event, dropdownName: string) {
		event.preventDefault();
		openDropdown = openDropdown === dropdownName ? null : dropdownName;
	}

	function handleResize() {
		isMobile = window.innerWidth <= 768;
		if (!isMobile) {
			isMenuOpen = false;
			openDropdown = null;
		}
	}

	function handleScroll() {
		if (!isMenuOpen) {
			isScrolled = window.scrollY > 0;
		}
	}

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class:isScrolled
	class={isSolid ? 'border-b-[0.5px] border-b-border bg-background h-[65px]' : 'border-b-transparent bg-transparent h-[80px]'}
>
	<div id="brand">
		<a href="/">
			<img class="logo" src="/pulso.png" alt="Pulso" />
		</a>
	</div>

	{#if isMobile}
		<button class="hamburger" onclick={toggleMenu} aria-label="Menu">
			<img src="/svg/menu-dots.svg" alt="Menu" class="invert-0 dark:invert" />
		</button>
	{:else}
		<nav aria-label="Navegación Menú Principal" class="justify-start">
			<ul class="nav-menu">
				{#each navItems as item}
					<li class="nav-item" class:dropdown={item.dropdown}>
						<a
							href={item.href}
							onclick={item.dropdown ? (e) => toggleDropdown(e, item.name) : null}
						>
							{item.name}
							{#if item.dropdown}
								<iconify-icon icon="mdi:chevron-down"></iconify-icon>
							{/if}
						</a>
						{#if item.dropdown && openDropdown === item.name}
							<ul class="dropdown-menu" transition:slide|local={{ duration: 300 }}>
								{#each item.dropdown as subItem}
									<li><a href={subItem.href}>{subItem.name}</a></li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
		<div class="actions">
			<div class="social-icons">
				{#each socialIcons as { name, href, src }}
					<a {href} target="_blank" rel="noopener noreferrer" aria-label={name}>
						<img {src} alt={name} class="max-w-4 invert-0 dark:invert" />
					</a>
				{/each}
			</div>
			{#if user}
				<AvatarMenu userName={user.name} src={user.profileImage} />
			{:else}
				<div class="access">
					<ShinyCta
						type="button"
						onClick={() => goto('/login')}
						paddingProp="0.5rem 1rem"
						bgSubtleColor="var(--primary)"
						highlightColor="var(--primary)"
						highlightSubtleColor="var(--primary)">Acceder</ShinyCta
					>
				</div>
			{/if}
			<ModeSwitch />
		</div>
	{/if}
</header>

{#if isMobile && isMenuOpen}
	<div class="mobile-menu" class:open={isMenuOpen} transition:fade={{ duration: 300 }}>
		<nav aria-label="Mobile Navigation">
			<ul class="nav-menu">
				{#each navItems as item}
					<li class="nav-item" class:dropdown={item.dropdown}>
						<a
							href={item.href}
							onclick={item.dropdown ? (e) => toggleDropdown(e, item.name) : toggleMenu}
						>
							{item.name}
							{#if item.dropdown}
								<iconify-icon icon="mdi:chevron-down"></iconify-icon>
							{/if}
						</a>
						{#if item.dropdown && openDropdown === item.name}
							<ul class="dropdown-menu" transition:slide|local={{ duration: 300 }}>
								{#each item.dropdown as subItem}
									<li><a href={subItem.href} onclick={toggleMenu}>{subItem.name}</a></li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}

				{#if user}
					<AvatarMenu src={user.profileImage} userName={user.name} />
				{:else}
					<li class="nav-item w-full justify-center">
						<ShinyCta
							onClick={() => goto('/login')}
							paddingProp="0.5rem 1rem"
							bgSubtleColor="var(--primary)"
							highlightColor="var(--primary)"
							highlightSubtleColor="var(--primary)">Acceder</ShinyCta
						>
					</li>
				{/if}
			</ul>
		</nav>
		<div class="social-icons">
			{#each socialIcons as { name, href, src }}
				<a {href} target="_blank" rel="noopener noreferrer" aria-label={name}>
					<img {src} alt={name} class="max-w-4 invert-0 dark:invert" />
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	header {
		display: flex;
		justify-content: start;
		align-items: center;
		padding: 1rem 4rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		transition:
			background-color 0.3s ease,
			backdrop-filter 0.3s ease,
			height 0.3s ease-in-out,
			border 0.3s ease-in-out;
		backdrop-filter: blur(0);
		width: 100%;
	}

	header.isScrolled {
		background-color: var(--background-neutral);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		height: 65px;
		border-bottom: 0.5px solid var(--border);
	}

	#brand {
		display: flex;
		flex: 1;
		justify-content: center;
	}

	.logo {
		max-width: 100px;
		height: auto;
		margin-left: 1.5rem;
	}

	nav {
		flex: 4;
		display: flex;
		font-family: 'Fira Sans';
	}

	.nav-menu {
		list-style: none;
		display: flex;
		gap: 1rem;
		margin-left: 1rem;
		padding: 0;
	}

	.nav-item a {
		text-decoration: none;
		color: var(--text-neutral);
		font-size: 1rem;
		transition: color 0.3s ease;
		display: flex;
		align-items: center;
	}

	.nav-item a:hover {
		color: var(--text);
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		background-color: rgba(2, 1, 8, 0.219);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		list-style: none;
		padding: 0.5rem 0;
		min-width: 150px;
		z-index: 1000;
	}

	.dropdown-menu li {
		padding: 0.5rem 1rem;
	}

	.dropdown-menu a {
		display: block;
		color: rgb(242, 242, 242);
		text-decoration: none;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}

	.dropdown-menu a:hover {
		opacity: 1;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.social-icons {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}

	.social-icons a {
		color: rgb(242, 242, 242);
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}

	.social-icons a:hover {
		opacity: 1;
	}

	.hamburger {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: rgb(242, 242, 242);
		font-size: 2rem;
	}

	.mobile-menu {
		position: fixed; /* Changed to fixed */
		top: 60px; /* Adjust this based on your header height */
		left: 0;
		right: 0;
		background-color: var(--background);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		z-index: 1000;
		padding: 1rem;
		transition: transform 0.3s ease;
		transform: translateY(-100%); /* Hidden by default */
		/* To prevent shifting content */
		pointer-events: none;
		height: 100vh;
	}

	.mobile-menu.open {
		transform: translateY(0); /* Slide in when open */
		pointer-events: auto;
	}

	.mobile-menu .nav-menu {
		flex-direction: column;
		margin-bottom: 1rem;
	}

	.mobile-menu .nav-item {
		padding: 0.5rem 0;
	}

	.mobile-menu .dropdown-menu {
		position: static;
		background-color: var(--background);
		padding: 1rem;
		border-radius: 7px;
		border: 1px solid var(--border);
		z-index: 9999;
		margin-top: 8px;
	}

	.mobile-menu .social-icons {
		justify-content: center;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		header {
			padding: 1rem;
		}
	}
</style>
