<script lang="ts">
  interface Props {
    data: any;
  }

  let { data }: Props = $props();
    const userName = data.user.name

  const homeCards = [
    {text: "Visualiza y edita tu información personal y profesional", title:"Perfil", icon:"/svg/user.svg", href:"/dashboard/profile"},
    {text: "Visualiza y controla tus reserva sy clientes", title:"Reservas", icon:"/svg/calendar.svg", href:"/dashboard/bookings"},
    {text: "Visualiza y modifica tu lecciones y servicios", title:"Servicios", icon:"/svg/briefcase.svg", href:"/dashboard/services"}
  ]
</script>
  
  <h1 class="font-fira font-bold text-2xl mb-4">¿Cómo estás {userName}?</h1>
  <h2 class="font-sans font-normal text-xl text-textNeutral mb-6">Revisa y completa los siguientes apartados</h2>

  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each homeCards as {text, title, icon, href}}
    <a {href} class="block p-6 bg-background text-textNeutral border border-border rounded-lg shadow hover:shadow-md hover:border-borderActive hover:text-text transition-all duration-100">
      <div class="opacity-85 hove:opacity-100"></div>
      <img src={icon} alt={title} class="invert-0 dark:invert">
      <h3 class="text-xl text-text mb-2">{title}</h3>
      <p class="text-md">{text}</p>
    </a>
    {/each}
  </div>
