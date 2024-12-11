<script>
	import CoolCta from '$src/components/CoolCTA.svelte';
</script>

<div class="flex flex-col sm:flex-row justify-even items-center mt-[75px]">
	<div class="flex h-full w-full flex-col items-center gap-6 px-4 py-8 text-center">
		<h1 class=" mt-24 font-fira text-3xl font-black uppercase sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
			Los Mejores <br /><span
				class="font-sans text-4xl text-primary md:text-4xl lg:text-5xl xl:text-6xl"
				>Instructores</span
			> <br />de Tu Montaña
		</h1>
		<h2 class="text-md font-sans font-medium text-neutral-500 md:text-lg lg:text-xl xl:text-2xl">
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
    <div class="aspect-w-5 aspect-h-3 flex flex-row w-full">
        <img src="/heroCards.png" alt="Tarjetas Instructores de Esquí" class="object-cover p-12 " />
    </div>
</div>

<div class="flex flex-col sm:flex-row justify-even items-center h-[100dvh]">
	
</div>
