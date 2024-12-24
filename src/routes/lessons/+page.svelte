<script>
	import InstructorCard from '$src/features/Instructors/components/instructor-card-3/InstructorCard.svelte';
</script>

<div class="wrapper">
	<InstructorCard />
	
    
</div>

<style>
	.wrapper {
		max-width: 1200px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(325px, auto));
		justify-content: center;
		margin: 0 auto;
		padding: 3rem;
		gap: 3.2rem 2.7rem;
	}
</style>
