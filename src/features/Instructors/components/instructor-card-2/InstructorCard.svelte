<script>
	import { goto } from "$app/navigation";
	import CoolCta from "$src/components/CoolCTA.svelte";
	import StarScore from "$src/components/StarScore.svelte";

</script>

<div class="instructor-card flex flex-col items-center justify-center p-2">
    <div class="flex flex-col items-center gap-1">
        <div class="AVATAR flex flex-col gap-1">
            <div class="size-40 overflow-hidden rounded-full border-[2px] border-border">
                <img src="/dve.png" alt="Profile" class="object-cover object-center" />
            </div>
            <div class="flex flex-row items-center justify-center gap-2">
                <h1 class="font-sans text-2xl font-bold">Dave M.</h1>
                <StarScore />
            </div>
        </div>
        <div class="MIDDLEWRAP flex flex-col sm:flex-row md:flex-col items-center justify-center gap-2">
            <div class="DETAILS flex flex-col justify-center gap-1 text-md">
                <div class="flex flex-row items-center gap-2 rounded-md border border-border">
                    <div class="border-r border-border bg-neutral-400/5 p-1">
                        <img
                            src="/svg/snowflake.svg"
                            alt="Deportes"
                            class="size-4 opacity-65 invert-0 dark:invert"
                        />
                    </div>
                    <h2 class="pr-2 text-textNeutral">Ski, Snowboard</h2>
                </div>
                <div class="flex flex-row items-center gap-2 rounded-md border border-border">
                    <div class="border-r border-border bg-neutral-400/5 p-1">
                        <img src="/svg/level.svg" alt="Nivel" class="size-4 opacity-65 invert-0 dark:invert" />
                    </div>
                    <h2 class="pr-2 text-textNeutral">Nivel 3 - AEPEDI</h2>
                </div>
                <div class="flex flex-row gap-2 rounded-md border border-border">
                    <div class="border-r border-border bg-neutral-400/5 p-1">
                        <img src="/svg/language.svg" alt="Idiomas" class="size-4 opacity-65 invert-0 dark:invert" />
                    </div>
                    <div class="flex flex-row items-center gap-1">
                        <img src="/svg/flags/flag--es.svg" alt="Spain" class="size-4 rounded-md opacity-80" />
                        <img src="/svg/flags/flag--es-ct.svg" alt="Spain" class="size-4 rounded-md opacity-80" />
                        <img src="/svg/flags/flag--gb.svg" alt="Spain" class="size-4 rounded-md opacity-80" />
                    </div>
                </div>
            </div>
            <div class="PRICE flex flex-col justify-center items-center">
                <p class="text-sm text-textNeutral">Desde:</p>
                <div class="flex w-full flex-row items-center justify-center gap-2">
                    <div
                        class="flex flex-col items-center gap-1 rounded-md border border-border bg-neutral-400/5 p-1.5"
                    >
                        <p class="border-b border-border font-fira text-xl font-semibold">
                            75 <span class="text-sm text-textNeutral">EUR</span>
                        </p>
                        <p class="text-sm text-textNeutral">1 Hora</p>
                    </div>
                    <div
                        class="flex flex-col items-center gap-1 rounded-md border border-border bg-neutral-400/5 p-1.5"
                    >
                        <p class="border-b border-border font-fira text-xl font-semibold">
                            430 <span class="text-sm text-textNeutral">EUR</span>
                        </p>
                        <p class="text-sm text-textNeutral">Día Entero</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-row gap-2 mt-auto pb-1">
        <CoolCta type="button" onClick={goto(`/profile/${instructorId}`)} paddingProp="0.5rem 1rem" borderRadius="7px" bgSubtleColor="var(--secondary-washed)" highlightColor="var(--secondary-washed)" highlightSubtleColor="var(--secondary-washed)" bgColor="var(--background)">
            <img src="/svg/user.svg" alt="Perfil" class="opacity-90 invert-0 dark:invert size-3.5" />
            <p class="font-fira text-md font-light text-text">Conóceme</p>
        </CoolCta>
        <CoolCta type="button" paddingProp="0.5rem 1rem" borderRadius="7px" >
            <img src="/svg/calendar.svg" alt="Calendario" class="opacity-90 invert-0 dark:invert size-3.5" />
            <p class="font-fira text-md font-light text-text">Resérvame</p>
        </CoolCta>
    </div>
</div>

<style>

    .instructor-card {
        min-width: 300px;
        width: 300px;
        height: 450px;
        border-radius: 7px;
        background-color: var(--background);
        overflow: hidden;
        outline: 2px solid var(--border);
        outline-offset: 1px;
        justify-self: center;
        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

</style>