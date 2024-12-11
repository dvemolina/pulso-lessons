<script lang="ts">
    import CoolCta from '$src/components/CoolCTA.svelte';
	import StarScore from '$src/components/StarScore.svelte';
</script>

<div class="flex flex-col items-center gap-4">
    <div class="size-52 overflow-hidden rounded-full border-4 border-border">
        <img src="/dve.png" alt="Profile" class="object-cover object-center" />
	</div>
    
	<div class="flex flex-row items-center justify-center gap-3">
        <h1 class="font-sans text-2xl font-bold">Dave M.</h1>
        <StarScore />
	</div>
    
	<div class="flex flex-col gap-1">
        <div class="flex flex-row items-center gap-2 rounded-md border border-border">
            <div class="border-r border-border p-1 bg-neutral-400/5">
                <img src="/svg/pin.svg" alt="Resort" class="size-5 opacity-65 invert-0 dark:invert" />
            </div>
            <h2 class="text-textNeutral pr-2">Cerro Catedral, Bariloche</h2>
		</div>
		<div class="flex flex-row items-center gap-2 rounded-md border border-border">
            <div class="border-r border-border p-1 bg-neutral-400/5">
                <img src="/svg/level.svg" alt="Nivel" class="size-5 opacity-65 invert-0 dark:invert" />
            </div>			
            <h2 class="text-textNeutral pr-2">Nivel 3 - AEPEDI</h2>
		</div>
		<div class="flex flex-row items-center rounded-md border border-border gap-2">
            <div class="border-r border-border p-1 bg-neutral-400/5">
                <img src="/svg/snowflake.svg" alt="Deportes" class="size-5 opacity-65 invert-0 dark:invert" />
            </div>
			<h2 class="text-textNeutral pr-2">Ski, Snowboard</h2>
		</div>
        <div class="flex flex-row gap-2 rounded-md border border-border">
            <div class="border-r border-border p-1 bg-neutral-400/5">
                <img src="/svg/language.svg" alt="Idiomas" class="size-5 opacity-65 invert-0 dark:invert" />
            </div>
            <div class="flex flex-row gap-1 items-center">
                <img src="/svg/flags/flag--es.svg" alt="Spain" class="size-5 opacity-80 rounded-md" />
                <img src="/svg/flags/flag--es-ct.svg" alt="Spain" class="size-5 opacity-80 rounded-md" />
                <img src="/svg/flags/flag--gb.svg" alt="Spain" class="size-5 opacity-80 rounded-md" />
            </div>
        </div>
        <div class="flex flex-col items-center mt-3">
            <p class="text-md text-textNeutral mb-2">Desde:</p>
            <div class="flex flex-row gap-3 w-full justify-center items-center">
                <div class="flex flex-col rounded-md border border-border p-3 gap-2 items-center bg-neutral-400/5">
                    <p class="border-b border-border font-fira font-semibold text-2xl">
                        75 <span class="text-sm text-textNeutral">EUR</span>
                    </p>
                    <p class="text-sm text-textNeutral">1 Hora</p>
                </div>
                <div class="flex flex-col rounded-md border border-border p-3 gap-2 items-center bg-neutral-400/5">
                    <p class="border-b border-border font-fira text-2xl font-semibold">
                        430 <span class="text-sm text-textNeutral">EUR</span>
                    </p>
                    <p class="text-sm text-textNeutral">Día Entero</p>
                </div>
            </div>
        </div>
	</div>
	<CoolCta>
		<img src="/svg/calendar.svg" alt="Calendar" class="opacity-90 invert" />
		<p class="font-fira text-lg font-semibold">Reservame Ahora</p>
	</CoolCta>
</div>
