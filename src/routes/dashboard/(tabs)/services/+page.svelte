<script lang="ts">
	
	import CreateServiceCard from '$src/features/services/ui/service-card/CreateServiceCard.svelte';
    import ServiceCard from '$src/features/services/ui/service-card/ServiceCard.svelte';
	
    const services = [];
    interface Props {
        serviceId: any;
    }

    let { serviceId }: Props = $props();
</script>

<h1 class="text-xl-typo mb-6">Servicios</h1>
<h2 class="text-lg-typo text-neutral-light">Servicio Básico</h2>
<h3 class="text-md text-neutral-light-inactive mb-4">Este servicio se puede modificar pero no eliminar.</h3>

<div class="basic-service mb-14">
    <ServiceCard type="edit" {serviceId}/>
</div>

<h2 class="text-lg-typo text-neutral-light">Servicios Profesionales</h2>
<h3 class="text-md text-neutral-light-inactive mb-4">Crea, modifica y gestiona el tipo de servicio que quieras.</h3>

<div class="services">
    {#each services as service}
        
    {/each}

    <CreateServiceCard />

</div>
