<script>
	import { goto } from "$app/navigation";

	
</script>

<div class="flex flex-col md:flex-row justify-evenly items-center mt-24 md:mt-0 w-full h-full px-4 gap-8 lg:gap-0">
	<div class="headings flex flex-col justify-center items-center md:items-start  gap-6 text-center md:text-left">
		<h1 class="font-fira leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight text-[1.95rem] font-black uppercase sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-text">
			Los Mejores <br /><span
				class="font-sans text-[2.5rem] text-primary sm:text-5xl md:text-[2.5rem] lg:text-5xl xl:text-6xl 2xl:text-8xl"
				>Instructores</span
			> <br />de Tu Montaña
		</h1>
		<h2 class="text-md font-sans font-medium text-textNeutral sm:text-lg  md:text-md lg:text-lg xl:text-2xl 2xl:text-4xl">
			Conecta con Profesionales Locales.<br /> Reserva tus clases de Esquí y Snowboard<br/> en cualquier
			estación de España
		</h2>
    
		<div class="flex flex-col-reverse lg:flex-row gap-4 items-center md:items-start lg:items-center mt-2 ">
			<a href="/instructores" class="text-primary xl:text-lg text-lg font-semibold font-fira hover:text-textNeutral hover:border-textNeutral border border-primaryWashed p-3 rounded-sm">
				<p>Eres Instructor?</p>
			</a>
			<button
				onclick={goto('/pulso')}
				aria-label="Encuentra Instructores"
				class="hover:bg-primaryActive hover:scale-105 xl:text-xl text-lg px-7 py-3 rounded-md bg-primary xl:px-10 xl:py-4 font-fira font-normal transition-all ease-in-out text-teal-50"
			>
				Encuentra Tu Instructor</button
			>
		</div>
    
	</div>
    <div class="cards flex flex-row items-center justify-center max-w-[375px] sm:max-w-[425px] md:max-w-[450px] lg:max-w-[475px] xl:max-w-[525px]">
        <img src="/heroCards.png" alt="Tarjetas Instructores de Esquí" class="object-cover" />
    </div>
</div>
 

