<script lang="ts">
	import AvatarLessonCard from "./AvatarLessonCard.svelte";
	import ButtonsBookLessonCard from "./ButtonsBookLessonCard.svelte";
	import ButtonsEditLessonCard from "./ButtonsEditLessonCard.svelte";
	import DataLessonCard from "./DataLessonCard.svelte";

	interface Props {
		lessonId: any,
		type: "edit" | null | undefined,
	}

	let { lessonId, type }: Props = $props();
	
</script>

<div class="card rounded-lg w-[250px] overflow-hidden  ease-in-out">
	<div class="avatar-section">
		<AvatarLessonCard />
	</div>
	<div class="content-section rounded-b-lg border-l border-r border-b border-neutral-gray">
		<DataLessonCard />
		{#if type === "edit"}
			<ButtonsEditLessonCard {lessonId}/>
		{:else}
			<ButtonsBookLessonCard {lessonId}/>
		{/if}
	</div>
</div>

<style>
    .card {
        box-shadow: 1px 1px 7px 2px rgba(0, 0, 0, 0.225);
    }

    .card:hover {
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.279);
    }
</style>
