<script>
	import ShinyCta from '$src/components/elements/buttons/ShinyCTA.svelte';
	import InstructorDetails from '$src/features/professionals/instructors/ui/profile-edit/InstructorDetails.svelte';
	import PersonalDetails from '$src/features/users/ui/profile-edit/PersonalDetails.svelte';
</script>

<form action="" method="post">
	<h1 class="mb-4 text-xl-typo">Perfil</h1>
	<h2 class="mb-8 px-2 text-neutral-light-inactive text-lg-typo">Modifica tus Datos y Detalles.</h2>

	<div class="section mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pb-8 pt-6">
		<h3 class="mb-8 border-b border-b-neutral-gray text-lg-typo">Detalles Personales - Usuario</h3>
		<PersonalDetails />
		<ShinyCta
			type="button"
			paddingProp="1rem 1.5rem"
			bgSubtleColor="var(--primary)"
			highlightColor="var(--primary)"
			highlightSubtleColor="var(--primary)">Guardar Datos Usuario</ShinyCta
		>
	</div>

	<div class="section mb-10 flex flex-col rounded-lg border-2 border-neutral-gray px-8 pt-6">
		<h3 class="mb-8 border-b border-b-neutral-gray text-lg-typo">
			Detalles Profesionales - Instructor
		</h3>
		<InstructorDetails />
	</div>
</form>

<style>
	.section {
		box-shadow: 1px 1px 7px 2px rgba(0, 0, 0, 0.444);
	}
</style>
