<script lang="ts">
	import CoolCta from '$src/components/CoolCTA.svelte';
	import StarScore from '$src/components/StarScore.svelte';
</script>

<div class="flex flex-col items-center h-full gap-5">
    <div class="AVATAR flex flex-col gap-4">
        <div class="size-52 overflow-hidden rounded-full border-[2px] border-border">
            <img src="/dve.png" alt="Profile" class="object-cover object-center" />
        </div>
        <div class="flex flex-row items-center justify-center gap-3">
            <h1 class="font-sans text-3xl font-bold">Dave M.</h1>
            <StarScore />
        </div>
    </div>
	<div class="MIDDLEWRAP flex flex-col sm:flex-row md:flex-col items-center justify-center gap-4">
        <div class="DETAILS flex flex-col justify-center gap-1">
            <div class="flex flex-row items-center gap-2 rounded-md border border-border">
                <div class="border-r border-border bg-neutral-400/5 p-1">
                    <img
                        src="/svg/snowflake.svg"
                        alt="Deportes"
                        class="size-5 opacity-65 invert-0 dark:invert"
                    />
                </div>
                <h2 class="pr-2 text-textNeutral">Ski, Snowboard</h2>
            </div>
            <div class="flex flex-row items-center gap-2 rounded-md border border-border">
                <div class="border-r border-border bg-neutral-400/5 p-1">
                    <img src="/svg/level.svg" alt="Nivel" class="size-5 opacity-65 invert-0 dark:invert" />
                </div>
                <h2 class="pr-2 text-textNeutral">Nivel 3 - AEPEDI</h2>
            </div>
            <div class="flex flex-row items-center gap-2 rounded-md border border-border">
                <div class="border-r border-border bg-neutral-400/5 p-1">
                    <img src="/svg/mountain.svg" alt="Resort" class="size-5 opacity-65 invert-0 dark:invert" />
                </div>
                <h2 class="pr-2 text-textNeutral">Cerro Catedral</h2>
            </div>
            <div class="flex flex-row gap-2 rounded-md border border-border">
                <div class="border-r border-border bg-neutral-400/5 p-1">
                    <img src="/svg/language.svg" alt="Idiomas" class="size-5 opacity-65 invert-0 dark:invert" />
                </div>
                <div class="flex flex-row items-center gap-1">
                    <img src="/svg/flags/flag--es.svg" alt="Spain" class="size-5 rounded-md opacity-80" />
                    <img src="/svg/flags/flag--es-ct.svg" alt="Spain" class="size-5 rounded-md opacity-80" />
                    <img src="/svg/flags/flag--gb.svg" alt="Spain" class="size-5 rounded-md opacity-80" />
                </div>
            </div>
        </div>

        <div class="PRICE flex flex-col justify-center items-center">
            <p class="text-md text-textNeutral">Desde:</p>
            <div class="flex w-full flex-row items-center justify-center gap-3">
                <div
                    class="flex flex-col items-center gap-2 rounded-md border border-border bg-neutral-400/5 p-3"
                >
                    <p class="border-b border-border font-fira text-2xl font-semibold">
                        75 <span class="text-sm text-textNeutral">EUR</span>
                    </p>
                    <p class="text-sm text-textNeutral">1 Hora</p>
                </div>
                <div
                    class="flex flex-col items-center gap-2 rounded-md border border-border bg-neutral-400/5 p-3"
                >
                    <p class="border-b border-border font-fira text-2xl font-semibold">
                        430 <span class="text-sm text-textNeutral">EUR</span>
                    </p>
                    <p class="text-sm text-textNeutral">Día Entero</p>
                </div>
            </div>
        </div>
    </div>
    <CoolCta btnWidth="100%" borderRadius="7px">
        <img src="/svg/calendar.svg" alt="Calendar" class="opacity-90 invert-0 dark:invert" />
        <p class="font-fira text-lg font-semibold text-text">Resérvame</p>
    </CoolCta>
</div>
