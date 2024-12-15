<script lang="ts">
    import Header from "$src/components/Header.svelte";

    let { children } = $props()

</script>

<Header />
    {@render children?.()}
