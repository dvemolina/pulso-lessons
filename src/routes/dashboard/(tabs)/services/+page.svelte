<script lang="ts">
	import ContentBox from "$src/components/ContentBox.svelte";

	
    const services = [];
    interface Props {
        serviceId: any;
    }

    let { serviceId }: Props = $props();
</script>

<h1 class="text-2xl font-fira font-semibold mb-6 text-text">Servicios</h1>
<p class="mb-8 text-textNeutral text-lg font-sans">Crea y modifica tus servicios profesionales</p>

<ContentBox>
    <h2 class="text-xl text-text font-sans border-b border-border">Servicio Básico</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Este servicio se puede modificar pero no eliminar.</h3>
</ContentBox>
    

<ContentBox>

    <h2 class="text-xl text-text font-sans border-b border-border">Servicios Profesionales</h2>
    <h3 class="text-md text-textNeutral mb-4 font-sans">Crea y gestiona el tipo de servicio que quieras.</h3>
    
    <div class="services">
        {#each services as service}
        
        {/each}
        
    </div>
    
</ContentBox>