<script lang="ts">
	import type { Lesson } from "$src/lib/server/db/schemas/lessons";
	import AvatarLessonCard from "./AvatarLessonCard.svelte";
	import ButtonsBookLessonCard from "./ButtonsBookLessonCard.svelte";
	import ButtonsEditLessonCard from "./ButtonsEditLessonCard.svelte";
	import DataLessonCard from "./DataLessonCard.svelte";

	interface Props {
		profileImage: string,
		lessonData: Lesson,
		type: "edit" | null | undefined,
	}

	let { lessonData, profileImage, type }: Props = $props();
	
</script>

<div class="card rounded-lg w-[250px] sm:w-[265px] overflow-hidden  ease-in-out">
	<div class="avatar-section">
		<AvatarLessonCard {profileImage}/>
	</div>
	<div class="content-section rounded-b-lg border-l border-r border-b border-border">
		<DataLessonCard {lessonData}/>
		{#if type === "edit"}
			<ButtonsEditLessonCard lessonId={lessonData.id}/>
		{:else}
			<ButtonsBookLessonCard lessonId={lessonData.id}/>
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
