<script lang="ts">
	import ReviewCard from '$src/features/Reviews/ui/ReviewCard.svelte';
	import ProfileHead from '$src/features/Instructors/components/ProfileHead.svelte';
	import type { Review } from '$src/features/Reviews/reviewType';
	import LessonCard from '$src/features/Lessons/components/LessonCard/LessonCard.svelte';

	let { data } = $props();

	let reviews: Review[] = [
		{
			clientName: 'Carlos L',
			clientPicture: '/favicon.png',
			bookingDate: '19-2-2024',
			score: 5,
			comment:
				'Un placer la clase con Mills, encantador y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		},
		{
			clientName: 'Dave',
			clientPicture: '/dve.png',
			bookingDate: '21-2-2024',
			score: 5,
			comment:
				'Muchísimos fallos al principio per me he dado cuenta de lo potente que son sus métodos de enseñanza. Un placer la clase con Mills, encantadora y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		},
		{
			clientName: 'Carlos L',
			clientPicture: '/favicon.png',
			bookingDate: '2-2-2024',
			score: 5,
			comment:
				'Un placer la clase con Mills, encantador y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		}
	];
</script>

<div class="WRAPPER mt-[82px] flex w-full flex-col justify-center gap-5 px-4 md:flex-row">
	<div
		class="HEAD flex w-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-background p-10 md:w-1/3 xl:w-1/4"
	>
		<ProfileHead profileData={data.profileData} />
	</div>
	<div
		class="CONTENT flex w-full flex-col gap-9 rounded-md border border-border bg-background p-10 md:w-2/3 xl:w-3/4"
	>
		<div class="ABOUT flex w-full flex-col gap-1">
			<h2 class="border-b border-border font-fira text-xl font-semibold text-text">Sobre Mí</h2>
			<p class="text-md font-sans font-normal text-textNeutral">
				{data.profileData.biography}
			</p>
		</div>
		<div class="SERVICES flex w-full flex-col gap-2">
			<h2 class="border-b border-border font-fira text-xl font-semibold text-text">
				Mis Servicios
			</h2>
			{#each data.services as service}
				<LessonCard
					ageGroups={$lists.ageGroups}
					currencies={$lists.currencies}
					lessonData={service}
					profileImage={data.profileData.profileImage}
					skillLevels={$lists.skillLevels}
					sports={$lists.sports}
					timeUnits={$lists.timeUnits}
				/>
			{/each}
		</div>
		<div class="REVIEW flex w-full flex-col gap-2">
			<h2 class="border-b border-border font-fira text-xl font-semibold text-text">
				Mis Valoraciones
			</h2>
			{#if reviews.length === 0}
				<p class="text-md font-sans font-normal text-textNeutral">
					Justo empiezo en Pulso! Yo te ayudo con mis conocimientos, tu me ayudas dejándome una
					valoración sobre que te ha parecido la clase! Resérvame!
				</p>
			{:else}
				{#each reviews as { clientName, clientPicture, bookingDate, score, comment }}
					<ReviewCard {clientName} {clientPicture} {bookingDate} {score} {comment} />
				{/each}
			{/if}
		</div>
	</div>
</div>
