<script>
	import ContentBox from "$src/components/ContentBox.svelte";
	import CustomControl from "$src/components/CustomControl.svelte";
	import FormField from "$src/components/FormField.svelte";
	import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";
	import { Control, Description, FieldErrors, Fieldset, Label, Legend } from "formsnap";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

    let { data } = $props();

    const lessonBasicsForm = superForm(data.lessonBasicsForm, {
        validators: zodClient(lessonBasicsSchema)
    });

    const { form: lessonBasicsData, enhance: lessonBasicsEnhance } = lessonBasicsForm

</script>
<a href="./" class=" font-fira font-semibold text-tex opacity-60 hover:opacity-100 focus:opacity-100 flex flex-row items-center mb-6 gap-2">
    <img src="/svg/arrow-left.svg" alt="Volver" class="invert-0 dark:invert">
    <p>Volver</p>
</a>
<h1 class="mb-4 font-fira text-2xl font-semibold">Titulo del Servicio <span class="text-textNeutral">ID: 91862</span></h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">Modifica las características y condiciones del servicio </h2>

<form action="" method="POST" class="flex w-full flex-col justify-center gap-4" use:lessonBasicsEnhance>
    <ContentBox shadow={true}>
        <h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Detalles Generales</h3>
        <fieldset class="flex w-full flex-col gap-4">
            <FormField form={lessonBasicsForm} name="title">
                <CustomControl label="Título del Servicio">
                    {#snippet children({ props })}
                        <input type="text" {...props} bind:value={$lessonBasicsData.title} placeholder="Introduce Título del Servicio">
                    {/snippet}
                </CustomControl>
            </FormField>
            <FormField form={lessonBasicsForm} name="description">
                <CustomControl label="Descripción del Servicio">
                    {#snippet children({ props })}
                        <textarea {...props} bind:value={$lessonBasicsData.description} placeholder="Describe el Servicio"></textarea>
                    {/snippet}
                </CustomControl>
            </FormField>
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="resortId">
					<CustomControl label="Estación" >
						{#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.resortId} placeholder="Selecciona Centro">
							<option value="0">Selecciona Centro</option>
							{#each data.resorts as { id, resort }}
							<option value={id} aria-label={resort}>{resort}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
					<Description>Indica la Estación en la que está disponible el Servicio</Description>	
				</FormField>
                <Fieldset form={lessonBasicsForm} name="sports" class="flex flex-col gap-4">
                    <Legend>Selecciona Deporte</Legend>
                    <Description>Puedes seleccionar más de uno. En el futuro incluiremos modalidades de cada deporte</Description>
                    <div class="flex flex-row items-center justify-start gap-4">
                        {#each data.sports as { id, sport }}
                        <Control>
                            {#snippet children({ props })}
                            <div class="flex flex-col items-center justify-center gap-2">
                                <input
                                type="checkbox"
                                {...props}
                                bind:group={$lessonBasicsData.sports}
                                value={id}
                                class="size-7 sm:size-10 rounded-full border border-border bg-bgNeutral"
                                />
                                <Label>{sport}</Label>
                            </div>
                            {/snippet}
                        </Control>
                        {/each}
                    </div>
                    <FieldErrors />
                </Fieldset>
            </div>
        </fieldset>
    </ContentBox>
</form>