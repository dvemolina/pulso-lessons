<script>
	import CoolCta from '$src/components/CoolCTA.svelte';
</script>

<div class="flex flex-col md:flex-row justify-evenly items-center mt-[75px] w-full">
	<div class="flex h-full flex-col items-center md:items-end gap-6 px-4 py-8 text-center md:text-right sm">
		<h1 class=" mt-24 font-fira text-3xl font-black uppercase sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
			Los Mejores <br /><span
				class="font-sans text-4xl text-primary sm:text-5xl  md:text-4xl lg:text-5xl xl:text-6xl"
				>Instructores</span
			> <br />de Tu Montaña
		</h1>
		<h2 class="text-md font-sans font-medium text-neutral-500 md:text-md lg:text-lg xl:text-xl">
			Conecta con Profesionales Locales.<br /> Reserva tus clases de Esquí y Snowboard<br /> en cualquier
			estación de España
		</h2>
		<!--
    
    <button
		aria-label="Encuentra Instructores"
		class="hover:bg-primary hover:scale-105  rounded-lg border-4 bg-transparent border-primary px-5 py-2 font-fira font-medium transition-all ease-in-out"
	>
		Encuentra Tu Instructor</button
	>
    -->
		<CoolCta paddingProp="1.1rem 2.3rem" borderRadius="10px" fontWeight="600">Encuentra Tu Instructor</CoolCta>
	</div>
    <div class="cards aspect-w-5 aspect-h-3 flex flex-row h-full">
        <img src="/heroCards.png" alt="Tarjetas Instructores de Esquí" class="object-cover pt-24 px-12 " />
    </div>
</div>

<div class="flex flex-col sm:flex-row justify-even items-center h-[100dvh]">
	
</div>

<style>
	.cards {
		min-width: 300px;
		max-width: 650px;
	}
</style>
