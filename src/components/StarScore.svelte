<script lang="ts">
	let { score = 5 } = $props();
</script>

<div class="flex flex-row justify-center items-center rounded-md bg-secondaryWashed px-2 gap-1">
	<p class="text-md text-text font-bold ">{score}</p>
	<img src="/svg/star.svg" alt="Stars" class="size-4 invert-0 dark:invert"/>
</div>
