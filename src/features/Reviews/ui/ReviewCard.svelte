 <script lang="ts">
    /*Function to sort the reviews by the:
        -Newer ones
        -Best points
        -With Client Image
    */
	import StarScore from "$src/components/StarScore.svelte";
    
    let {
        clientName,
        clientPicture,
        bookingDate,
        score,
        comment,
    } = $props()
 </script>

 <div class=" h-full flex flex-row p-4 rounded-md border border-border gap-6 bg-neutral-400/5">
    <div class="flex flex-col items-center gap-2">
        <StarScore {score} />
        <div class="border border-boder rounded-full overflow-hidden size-16">
            <img src={clientPicture} alt="Cliente" class="object-cover">
        </div>
    </div>
    <div class="flex flex-col">
        <p>{clientName} <span class="ml-2 font-fira font-extralight text-sm text-textNeutral">{bookingDate}</span></p>
        <p class="text-textNeutral text-sm font-light font-fira mt-1">{comment}</p>
    </div>
 </div>