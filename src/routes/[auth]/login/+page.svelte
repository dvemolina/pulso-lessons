<script lang="ts">
	import CoolCta from "$src/components/CoolCTA.svelte";
	import GoogleBtn from "$src/components/GoogleBtn.svelte";
</script>

<div class="flex h-[100dvh] px-4 flex-col items-center justify-center">
  
    <div class="flex flex-col mt-14 items-center justify-center bg-background border border-border rounded-lg px-8 py-12 ">
        <form action="" method="post" class="flex flex-col gap-10">
            
            <div class="flex flex-col gap-6">
                <p class="self-center text-text font-fira font-semibold text-xl">Accede a tu Cuenta</p>
                <div class="flex flex-col gap-5">
                    <input type="email" name="email" id="email" placeholder="Email" class="w-full">
                    <input type="password" name="password" id="password" placeholder="Contraseña">            
                </div>   
            </div>
            <div class="flex flex-col gap-4 items-center">
                <GoogleBtn>Acceder con Cuenta Google</GoogleBtn>
                <CoolCta type="submit">Acceder</CoolCta>
                <a href="/signup" class="text-textNeutral hover:text-text">No tengo Cuenta</a>
                <a href="/recover-password" class="text-textNeutral hover:text-text">Recuperar Contraseña</a>
            </div>   
        </form>
    </div>
</div>