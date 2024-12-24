<script>
	import { goto } from '$app/navigation';
	import CoolCta from '$src/components/CoolCTA.svelte';
	import StarScore from '$src/components/StarScore.svelte';

    let { data } = $props();
</script>

<div style="background-image: url('/dve.png');" class="instructor-card flex w-full flex-col items-center justify-end m-0 p-0 shadow-lg">
	<div class="glass flex flex-col gap-2 px-3 py-1.5 w-full">
		<div class="flex w-full flex-row items-center justify-start gap-2">
			<h1 class="font-sans text-xl font-bold">Dave M.</h1>
			<StarScore />
		</div>
		<div class="MIDDLEWRAP flex w-full flex-row items-center justify-between gap-2">
			<div class="DETAILS flex w-3/5 flex-col justify-center gap-1 text-sm">
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
						<img
							src="/svg/language.svg"
							alt="Idiomas"
							class="size-4 opacity-65 invert-0 dark:invert"
						/>
					</div>
					<div class="flex flex-row items-center gap-1">
						<img src="/svg/flags/flag--es.svg" alt="Spain" class="size-4 rounded-md opacity-80" />
						<img
							src="/svg/flags/flag--es-ct.svg"
							alt="Spain"
							class="size-4 rounded-md opacity-80"
						/>
						<img src="/svg/flags/flag--gb.svg" alt="Spain" class="size-4 rounded-md opacity-80" />
					</div>
				</div>
			</div>
			<div class="PRICE flex w-2/5 flex-col items-center justify-center">
				<p class="text-sm text-textNeutral">Desde:</p>
				<div class="flex w-full flex-row items-center justify-center gap-2">
					<div
						class="flex w-full flex-col items-center gap-1 rounded-md border border-border bg-neutral-400/5 px-3 py-1"
					>
						<p class="border-b border-border font-fira text-xl font-semibold">
							75 <span class="text-sm text-textNeutral">EUR</span>
						</p>
						<p class="text-sm text-textNeutral">1 Hora</p>
					</div>
					<!--
                        <div
                        class="flex flex-col items-center gap-1 rounded-md border border-border bg-neutral-400/5 p-1.5"
                        >
                        <p class="border-b border-border font-fira text-xl font-semibold">
                            430 <span class="text-sm text-textNeutral">EUR</span>
                        </p>
                        <p class="text-sm text-textNeutral">Día Entero</p>
                    </div>
                    -->
				</div>
			</div>
		</div>
		<div class="flex flex-row items-end gap-2 pb-1">
			<CoolCta
				type="button"
				onClick={goto(`/profile/${instructorId}`)}
				paddingProp="0.5rem 1rem"
				borderRadius="7px"
				bgSubtleColor="var(--secondary-washed)"
				highlightColor="var(--secondary-washed)"
				highlightSubtleColor="var(--secondary-washed)"
				bgColor="var(--cta-secondary)"
                btnWidth="100%"
			>
				<img src="/svg/user.svg" alt="Perfil" class="size-3.5 opacity-90 invert-0 dark:invert" />
				<p class="text-md font-fira font-light text-text">Perfil</p>
			</CoolCta>
			<CoolCta type="button" paddingProp="0.5rem 1rem" borderRadius="7px" btnWidth="100%">
				<img
					src="/svg/calendar.svg"
					alt="Calendario"
					class="size-3.5 opacity-90 invert-0 dark:invert"
				/>
				<p class="text-md font-fira font-light text-text">Reservar</p>
			</CoolCta>
		</div>
	</div>
</div>

<style>
	.instructor-card {
		min-width: 300px;
		width: 300px;
		height: 460px;
		border-radius: 7px;
		background-position: center top;
        background-size: cover;
		overflow: hidden;
		outline: 2px solid var(--border);
		outline-offset: 0;
		justify-self: center;
		transition: all 0.13s ease-in-out;
		cursor: pointer;
	}

    .instructor-card:hover {
        outline: 2px solid var(--border-active);
    }
</style>
