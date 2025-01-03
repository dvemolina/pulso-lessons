<script lang="ts">
	import type { Lesson } from '$src/lib/server/db/schemas/lessons';
	import type { AgeGroups, Currencies, SkillLevels, Sports, TimeUnits } from '$src/lib/server/db/schemas/normalized';
	import AvatarLessonCard from './AvatarLessonCard.svelte';
	import ButtonsBookLessonCard from './ButtonsBookLessonCard.svelte';
	import ButtonsEditLessonCard from './ButtonsEditLessonCard.svelte';
	import DataLessonCard from './DataLessonCard.svelte';

	interface Props {
		profileImage: string,
		lessonData: Lesson,
		type?: 'edit' | null | undefined,
		currencies: Currencies[],
		skillLevels: SkillLevels[],
		ageGroups: AgeGroups[],
		sports: Sports[],
		timeUnits: TimeUnits[]
	}

	let { lessonData, profileImage, type, currencies, skillLevels, ageGroups, sports, timeUnits }: Props = $props();
</script>

<div class="card w-[250px] overflow-hidden rounded-lg ease-in-out sm:w-[265px]">
	<div class="avatar-section">
		<AvatarLessonCard lessonSports={lessonData.sports} {sports} {profileImage} />
	</div>
	<div class="content-section rounded-b-lg border-b border-l border-r border-border">
		<DataLessonCard {skillLevels} {currencies} {ageGroups} {lessonData} {timeUnits}/>
		{#if type === 'edit'}
			<ButtonsEditLessonCard lessonId={lessonData.id} />
		{:else}
			<ButtonsBookLessonCard lessonId={lessonData.id} />
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
