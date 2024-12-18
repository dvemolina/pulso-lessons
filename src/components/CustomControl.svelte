<script lang="ts">
	import { Control, Label } from "formsnap";
	import type { ComponentProps } from "svelte";
 
	let {
		label,
        hiddenLabel = false,
		// Rename the children prop to childrenProp to avoid
		// conflicts with the Control component
		children: childrenProp,
		...restProps
	}: ComponentProps<typeof Control> & {
		label: string,
		hiddenLabel?: boolean
	} = $props();
</script>
 
<Control {...restProps}>
	{#snippet children({ props })}
            {#if hiddenLabel}
			<Label class="hidden">{label}</Label>
            {:else}
            <Label>{label}</Label>
            {/if}
			<!-- Forward the props to the children snippet -->
			{@render childrenProp({ props })}
	{/snippet}
</Control>