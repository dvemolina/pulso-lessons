<script lang="ts">
	import ContentBox from "$src/components/ContentBox.svelte";
	import LessonCard from "$src/features/Lessons/components/LessonCard/LessonCard.svelte";

    let { data } = $props();
</script>

<h1 class="text-2xl font-fira font-semibold mb-4 text-text">Servicios</h1>
<p class="mb-8 text-textNeutral text-lg font-sans">Crea y modifica tus servicios profesionales</p>

<ContentBox>
    <h2 class="text-xl text-text font-sans border-b border-border">Servicio Básico</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Este servicio se puede modificar pero no eliminar.</h3>
    {#each data.lessons as lesson }
        <LessonCard type="edit" lessonData={lesson} profileImage={data.user?.profileImage} currencies={data.currencies} sports={data.sports} skillLevels={data.skillLevels} ageGroups={data.ageGroups} timeUnits={data.timeUnits}/>
    {/each}
</ContentBox>
    

<ContentBox>

    <h2 class="text-xl text-text font-sans border-b border-border">Servicios Profesionales</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Crea y gestiona el tipo de servicio que quieras.</h3>
    <p class="text-md text-textNeutral mb-4 font-sans">(Solo está habilitado el servicio básico. Pronto habilitaremos para que crees lecciones de distintas modalidades de tu deporte)</p>
    
</ContentBox>