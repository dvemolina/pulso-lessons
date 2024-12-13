<script>
	import ModeSwitch from "$src/components/ModeSwitch.svelte";

    let { children } = $props()
</script>

<div class="flex p-0 sm:px-4 h-full flex-col justify-center items-center">
    <div class="flex flex-col h-full w-full sm:h-auto sm:w-auto items-center justify-center gap-5 bg-background border border-border rounded-md sm:px-8 sm:py-10">
        <a href="/">
            <img src="/pulso.png" alt="Pulso - Inicio" class="w-20">
        </a>
        {@render children?.()}
    </div>
</div>