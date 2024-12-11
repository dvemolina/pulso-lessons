<script lang="ts">
	let { score = 5 } = $props();
</script>

<div class="flex flex-row justify-center items-center rounded-md bg-secondary px-2">
	<p class="text-md text-background font-bold ">{score}/5</p>
	<img src="/svg/star.svg" alt="Stars" class="size-4"/>
</div>
