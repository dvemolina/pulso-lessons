<script lang="ts">
	import ContentBox from "$src/components/ContentBox.svelte";
	import LessonCard from "$src/features/Lessons/components/LessonCard/LessonCard.svelte";

	
    const services = [];

    let { data } = $props();
</script>

<h1 class="text-2xl font-fira font-semibold mb-4 text-text">Servicios</h1>
<p class="mb-8 text-textNeutral text-lg font-sans">Crea y modifica tus servicios profesionales</p>

<ContentBox>
    <h2 class="text-xl text-text font-sans border-b border-border">Servicio Básico</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Este servicio se puede modificar pero no eliminar.</h3>
    <LessonCard type="edit" profileImage={data.user?.profileImage}/>
</ContentBox>
    

<ContentBox>

    <h2 class="text-xl text-text font-sans border-b border-border">Servicios Profesionales</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Crea y gestiona el tipo de servicio que quieras.</h3>
    <p class="text-md text-textNeutral mb-4 font-sans">(Solo está habilitado el servicio básico. Pronto habilitaremos todo tipo de clases para distintas modalidades de tu deporte)</p>
    
</ContentBox>