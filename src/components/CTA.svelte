<script lang="ts">
    
    interface Props {
        type?: 'button' | 'reset' | 'submit'
        label: string,
        children: any
    }
    
    let { label, type = "button", children }: Props = $props()
</script>

<button
    type={type}
	aria-label={label}
	class="rounded-md bg-primary px-7 py-3 font-fira text-lg font-medium text-teal-50 transition-all ease-in-out hover:scale-105 hover:bg-primaryActive xl:px-10 xl:py-4 xl:text-xl"
>
<span class="flex flex-row gap-2 justify-center items-center">
    {@render children?.()}
</span>	
</button
>
