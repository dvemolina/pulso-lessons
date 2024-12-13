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

 <div class=" h-full flex flex-col sm:flex-row p-4 rounded-md border border-border sm:gap-6 bg-bgNeutral">
    <div class="flex flex-col items-center gap-2">
        <StarScore {score} />
        <div class="border border-boder rounded-full overflow-hidden size-14">
            <img src={clientPicture} alt="Cliente" class="object-cover">
        </div>
    </div>
    <div class="flex flex-col items-center sm:items-start">
        <div class="flex flex-col items-center sm:items-center sm:flex-row sm: sm:gap-4 ">
            <p>{clientName}</p> 
            <p class="font-fira font-extralight text-sm text-textNeutral">{bookingDate}</p>

        </div>
        <p class="text-textNeutral text-sm font-light font-fira mt-1">{comment}</p>
    </div>
 </div>