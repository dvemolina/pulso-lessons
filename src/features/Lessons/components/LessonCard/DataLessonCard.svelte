<script lang="ts">
	import type { Lesson } from "$src/lib/server/db/schemas/lessons";
	import { type AgeGroups, type Currencies, type SkillLevels, type TimeUnits } from "$src/lib/server/db/schemas/normalized";
	import { mapIdsToValues } from "$src/lib/utils/utils";


    interface Props {
        lessonData: Lesson,
        currencies: Currencies[],
        skillLevels: SkillLevels[],
        ageGroups: AgeGroups[],
        timeUnits: TimeUnits[],
    }

    let { lessonData, currencies, skillLevels, ageGroups, timeUnits }: Props = $props()

    const mappedCurrency = mapIdsToValues(lessonData.currencyId, currencies, 'id', 'code');
    const mappedSkillLevels = mapIdsToValues([lessonData.minSkillId, lessonData.maxSkillId], skillLevels, 'id', 'skillLevel');
    const mappedAgeGroups = mapIdsToValues([lessonData.minAgeGroupId, lessonData.maxAgeGroupId], ageGroups, 'id', 'ageGroup')
    const mappedTimeUnit = mapIdsToValues(lessonData.timeUnitId, timeUnits, 'id', 'timeUnit')
</script>

<div class="data-section px-3 pt-3">
	<h1 class="text-text text-lg font-normal font-fira">
		{lessonData.title}
	</h1>

    <div class="flex flex-row justify-between gap-0.5  py-4">

        <div class="fares flex flex-col justify-center items-center w-[35%] border-2 border-border rounded-lg">
            <div class="price-time flex flex-col gap-2 justify-center items-center  ">
                <div class="price flex flex-row items-center justify-center border-b border-border text-[1.4rem]">{lessonData.basePrice} <span class="currency text-textNeutral text-xs ml-0.5">{mappedCurrency}</span></div>
                <div class="time flex flex-row items-center justify-center text-textNeutral text-[0.9rem]">{lessonData.minTimeUnit} {mappedTimeUnit}</div>
            </div>
        </div>
        <div class="details w-[60%] flex flex-col gap-1">
            <div class="students border-2 border-border rounded-lg text-center text-[0.75rem] text-textNeutral py-0.5"> Mín: {lessonData.minStudents} - Máx: {lessonData.maxStudents} Alumnos</div>
            <div class="level border-2 border-border rounded-lg text-center text-[0.75rem] text-textNeutral py-0.5">{mappedSkillLevels[0]}{mappedSkillLevels[1] ? ` - ${mappedSkillLevels[1]}` : ""}</div>
            <div class="students border-2 border-border rounded-lg text-center text-[0.75rem] text-textNeutral py-0.5">{mappedAgeGroups[0]}{mappedAgeGroups[1] ? ` - ${mappedAgeGroups[1]}` : ""}</div>
        </div>
    </div>
</div>
