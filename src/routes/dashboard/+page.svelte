<script lang="ts">
  interface Props {
    data: any;
  }

  let { data }: Props = $props();
    const userName = data.user.name
</script>
  
  <h1 class="font-fira font-bold text-xl-typo mb-4">¿Cómo estás {userName}?</h1>
  <h2 class="font-actor font-normal text-md-typo text-neutral-light-inactive mb-6">Revisa y completa los siguientes apartados</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <a href="/dashboard/profile" class="block p-6 bg-transparent text-neutral-light-inactive border border-neutral-light-inactive rounded-lg shadow hover:shadow-md hover:border-neutral-light hover:text-neutral-light transition-all duration-100">
      <iconify-icon class="icon" icon="pixelarticons:user"></iconify-icon>
      <h3 class="text-lg-typo mb-2">Perfil</h3>
      <p class="text-sm-typo">Visualiza y edita tu información personal y profesional</p>
    </a>
    
    <a href="/dashboard/bookings" class="block p-6 bg-transparent text-neutral-light-inactive border border-neutral-light-inactive rounded-lg shadow hover:shadow-md hover:border-neutral-light hover:text-neutral-light transition-all duration-100">
      <iconify-icon class="icon" icon="pixelarticons:calendar-month"></iconify-icon>
      <h3 class="text-lg-typo mb-2">Reservas</h3>
      <p class="text-sm-typo">Visualiza y controla tus reservas y clientes</p>
    </a>
    
    <a href="/dashboard/services" class="block p-6 bg-transparent text-neutral-light-inactive border border-neutral-light-inactive rounded-lg shadow hover:shadow-md hover:border-neutral-light hover:text-neutral-light transition-all duration-100">
      <iconify-icon class="icon" icon="pixelarticons:ac"></iconify-icon>
      <h3 class="text-lg-typo mb-2">Servicios</h3>
      <p class="text-sm-typo">Crea y maneja tus servicios profesionales</p>
    </a>
  </div>

  <style>
    .icon {
      font-size: 2rem;
    }
  </style>