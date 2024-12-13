<script lang="ts">
	import ReviewCard from '$src/features/Reviews/ui/ReviewCard.svelte';
	import ProfileHead from '$src/features/Users/ui/ProfileHead.svelte';
	import type { Review } from '$src/features/Reviews/reviewType';

	let reviews: Review[] = [
		{
			clientName: 'Carlos L',
			clientPicture: '/favicon.png',
			bookingDate: '19-2-2024',
			score: 5,
			comment:
				'Un placer la clase con Dave, encantador y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		},
		{
			clientName: 'Dave',
			clientPicture: '/dve.png',
			bookingDate: '21-2-2024',
			score: 5,
			comment:
				'Soy tan espectacular que me he podido dar una lección ami mismo. Muchísimos fallos al principio per me he dado cuenta de lo potente que son mis metodos de enseñanza. Un placer la classe con Dave, encantador y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		},
		{
			clientName: 'Carlos L',
			clientPicture: '/favicon.png',
			bookingDate: '2-2-2024',
			score: 5,
			comment:
				'Un placer la clase con Dave, encantador y me hizo mejorar como nunca antes pensaba que sería posible. Recomendable 100%'
		}
	];
</script>

<div class="WRAPPER mt-24 flex h-full w-full flex-col justify-center gap-4 px-4 md:flex-row">
	<div
		class="HEAD flex h-full w-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-background p-10 md:w-1/3 xl:w-1/4"
	>
		<ProfileHead />
	</div>
	<div
		class="CONTENT flex h-full w-full flex-col gap-7 rounded-md border border-border bg-background p-10 md:w-2/3 xl:w-3/4"
	>
		<div class="ABOUT flex w-full flex-col gap-1">
			<h2 class="font-fira text-lg font-semibold text-text">Sobre Mí</h2>
			<p class="text-md font-sans font-normal text-textNeutral">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti suscipit debitis
				officiis aliquid, facilis id eveniet pariatur possimus ducimus? Lorem, ipsum dolor sit amet
				consectetur adipisicing elit. Suscipit quia magnam delectus nisi esse voluptatem, quos
				quaerat deserunt ex dignissimos eveniet dolor quis reiciendis voluptatibus labore ratione
				maxime consectetur. Ullam.
			</p>
		</div>
		<div class="REVIEW flex h-full w-full flex-col gap-2">
			<h2 class="font-fira text-lg font-semibold text-text">Mis Valoraciones</h2>
			{#each reviews as { clientName, clientPicture, bookingDate, score, comment }}
				<ReviewCard {clientName} {clientPicture} {bookingDate} {score} {comment} />
			{/each}
		</div>
	</div>
</div>
