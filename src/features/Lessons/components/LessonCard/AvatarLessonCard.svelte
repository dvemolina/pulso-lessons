<script lang="ts">

    interface Props {
        avatarImageUrl?: string;
        sport?: string;
    }

    let { avatarImageUrl = "/img/Jordi.jpg", sport = "/img/skier-icon-pixel.png" }: Props = $props();
</script>


<div class="avatar-section relative flex justify-center items-center w-ful h-[150px] overflow-hidden bg-[url('/img/tracks.jpg')] bg-cover bg-black bg-opacity-70 bg-blend-overlay">
    <div class="sport-badge absolute left-1 top-1 border w-fit border-neutral-light-inactive rounded-lg p-1 shadow-md bg-gray-500 bg-opacity-20">
        <img class="max-w-[30px]" src={sport} alt="Deporte">
    </div>
    <div class="discount-badge absolute -right-8 top-3 rotate-45 border-white bg-orange-200 w-28 text-center text-black shadow-md">
        <p>-20%</p>
    </div>
    <div class="avatar shadow-md border-black max-w-[100px] rounded-full max-h-[110px] overflow-hidden">
        <img src={avatarImageUrl} alt="Instructor Avatar">
    </div>
</div>

<style>


    .avatar img {
        object-fit: cover;
        object-position: center;
    }
</style>