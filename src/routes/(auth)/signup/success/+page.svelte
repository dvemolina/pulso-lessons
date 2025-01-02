<script lang="ts">
    let { data } = $props();
</script>

<div class="flex flex-col justify-center items-center gap-6 max-w-96">
    <p class="text-text font-fira font-semibold text-2xl">Cuenta creada {data.user?.name}!</p>
    <p class="text-text text-md font-sans text-center">En breves recibirás un correo de bienvenida confirmando la creación de tu cuenta. Navega a tu Dashboard para gestionar tu perfil, busca y realiza alguna reserva o conoce más sobre Pulso:</p>
    <div class="flex flex-row gap-3">
        <a href="/dashboard" class="text-textNeutral hover:text-text focus:text-text text-lg">
            Dashboard
        </a>
        <a href="/pulso" class="text-textNeutral hover:text-text focus:text-text text-lg">
            Encuentra Clase
        </a>
        <a href="/nosotros" class="text-textNeutral hover:text-text focus:text-text text-lg">
            Conócenos
        </a>
    </div>
</div>