<script lang="ts">
    import Header from "$src/components/Header.svelte";

    let { data, children } = $props()
</script>

<Header user={data.user} isSolid={true}/>
{@render children?.()}


