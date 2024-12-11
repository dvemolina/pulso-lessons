<script lang="ts">
	let { starScore = 5 } = $props();
</script>

<div class="flex flex-row justify-center items-center rounded-md bg-secondary px-2">
	<p class="text-md text-background font-bold ">{starScore}/5</p>
	<img src="/svg/star.svg" alt="Stars" class="size-4"/>
</div>
