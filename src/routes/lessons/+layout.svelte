<script lang="ts">
	import LessonsHeader from "$src/components/LessonsHeader.svelte";

	let { data, children } = $props()
	
</script>

<LessonsHeader user={data.user}/>

{@render children()}