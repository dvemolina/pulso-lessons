<script lang="ts">

    interface Props {
        profileImage: string;
        sport?: string;
    }

    let { profileImage = "/pulso.png", sport = "Ski" }: Props = $props();
</script>


<div style="background-image: url('/tracks.jpg');" class="avatar-section relative flex justify-center items-center w-full h-[165px] overflow-hidden bg-cover bg-black bg-opacity-70 bg-blend-overlay">
    <div class="absolute left-1 top-1 border w-fit border-border text-sm rounded-lg p-0.5 px-1.5 shadow-md bg-gray-500 bg-opacity-50 text-white">
        {sport}
    </div>
    <div class="absolute -right-8 top-3 rotate-45 border-border bg-orange-200 w-28 text-center text-text shadow-md">
        <p class="text-black">-20%</p>
    </div>
    <div class="avatar shadow-md border-border size-28 rounded-full  overflow-hidden">
        <img src={profileImage} alt="Instructor Avatar">
    </div>
</div>

<style>


    .avatar img {
        object-fit: cover;
        object-position: center;
    }
</style>