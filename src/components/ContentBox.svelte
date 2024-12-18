<script lang="ts">
	import type { Snippet } from "svelte";


interface Props {
    shadow?: boolean
    children: Snippet
}

let { shadow = true, children } = $props()

</script>

<div class="{shadow === true ? 'shadowbox' : ''} mb-10 flex flex-col rounded-lg border-2 border-border px-8 pb-8 pt-6 bg-background">
{@render children?.()}
</div>