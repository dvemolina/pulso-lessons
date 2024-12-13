<script>
    let { children } = $props()
</script>

<div class="flex h-[100dvh] px-4 flex-col items-center justify-center">
    {@render children?.()}
</div>