<script lang="ts">
	import AvatarInstructorCard from './AvatarInstructorCard.svelte';
	import DataInstructorCard from './DataInstructorCard.svelte';
	import ButtonsInstructorCard from './ButtonsInstructorCard.svelte';

	interface Props {
		instructorImg?: string;
	}

	let { instructorImg = '/dve.png' }: Props = $props();

	let isHovered = $state(false);
	let bioIsOpen = $state(false);
	let openBio = () => {
		bioIsOpen = !bioIsOpen;
	};
</script>

<div
	class="instructor-card"
	style="background-image: url({instructorImg})"
	onclick={openBio}
	onmouseover={() => (isHovered = true)}
	onfocus={() => (isHovered = true)}
	onmouseout={() => (isHovered = false)}
	onblur={() => (isHovered = false)}
	role="button"
	aria-expanded={bioIsOpen}
	tabindex="0"
	aria-label="Muestra la Biografía"
	onkeydown={(event) =>
		event.key === 'Enter' || event.key === ' ' ? (bioIsOpen = !bioIsOpen) : null}
>
	<div class="avatar" class:active={bioIsOpen} class:expanded={isHovered}>
		<AvatarInstructorCard />
	</div>
	<div class="blur-area" class:active={bioIsOpen} class:expanded={isHovered}>
		<div class="data" class:active={bioIsOpen}>
			{#if !bioIsOpen}
				<DataInstructorCard />
			{:else}
				<div class="bio" class:active={bioIsOpen}>
					<p class="bio-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt tenetur consequuntur ad, pariatur culpa illum doloremque dolore porro obcaecati sit quasi incidunt impedit! Pariatur aliquam, dolorum beatae eligendi amet cupiditate.</p>
				</div>
			{/if}
		</div>

		<div class="buttons" class:active={bioIsOpen}>
			<ButtonsInstructorCard />
		</div>
	</div>
</div>

<style>
	.instructor-card {
		min-width: 300px;
		width: 300px;
		height: 460px;
		border-radius: 7px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: bottom center;
		margin: 0;
		padding: 0;
		overflow: hidden;
		outline: 3px solid rgba(238, 238, 238, 0.171);
		outline-offset: 1px;
		justify-self: center;
		transition: all 0.1s ease-in-out;
		cursor: pointer;
	}

	.instructor-card:hover, .instructor-card:focus {
		outline: 3px solid var(--border-active);
		/*box-shadow: 4px 4px 10px 5px rgb(0, 0, 0);*/
		box-shadow: 0 0 7px 0 var(--border-active);
	}

	.avatar {
		height: 60%;
		transition: all 0.3s ease-in-out;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.blur-area {
		height: 40%;
		background-color: rgba(37, 37, 37, 0.5);
		backdrop-filter: blur(20px);
		transition: all 0.3s ease-in-out;
	}

	.data {
		height: 71%;
		border: none;
		transition: all 0.3s ease-in-out;
	}

	.buttons {
		height: 29%;
		margin-top: auto;
		transition: all 0.3s ease-in-out;
	}



	/* When Clicked */
	.avatar.active {
		height: 12%;
	}
	.blur-area.active {
		height: 88%;
	}
	.data.active {
		height: 85%;
	}
	.buttons.active {
		height: 15%;
	}

	.bio {
		padding: 1rem;
	}
	.bio-text {
		font-size: 1rem;
		text-align: justify;
		text-justify: newspaper;
	}
</style>
