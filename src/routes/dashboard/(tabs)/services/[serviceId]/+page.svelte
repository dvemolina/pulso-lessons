<script>
	import ContentBox from "$src/components/ContentBox.svelte";
	import CoolCta from "$src/components/CoolCTA.svelte";
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

    const timeUnits = [
        {value: "hour", label: "Hora"},
        {value: "day", label: "Día"}
    ]
</script>
<a href="./" class=" font-fira font-semibold text-tex opacity-60 hover:opacity-100 focus:opacity-100 flex flex-row items-center mb-6 gap-2">
    <img src="/svg/arrow-left.svg" alt="Volver" class="invert-0 dark:invert">
    <p>Volver</p>
</a>
<h1 class="mb-4 font-fira text-2xl font-semibold">Titulo del Servicio <span class="text-textNeutral">ID: 91862</span></h1>
<h2 class="mb-8 font-sans text-lg text-textNeutral">Modifica las características y condiciones del servicio </h2>

<form action="?/lessonBasics" method="POST" class="flex w-full flex-col justify-center gap-3" use:lessonBasicsEnhance>
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
    <ContentBox shadow={true}>
        <h3 class="mb-2 border-b border-b-border font-fira text-xl font-normal">Duración</h3>
        <p class="mb-8 font-fira text-md text-textNeutral font-normal">Genera los bloques mínimos/máximo de reserva. Cantidad de horas/días que se puede reservar tu lección. </p>
        <fieldset class="flex w-full flex-col gap-4">
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="timeUnit">
                    <CustomControl label="Unidad de Tiempo (UT)" >
                        {#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.timeUnit} placeholder="Selecciona Tipo Unidad de Tiempo">
							<option value="">Selecciona Unidad de Tiempo</option>
							{#each timeUnits as { value, label }}
							<option value={value} aria-label={label}>{label}</option>
							{/each}
						</select>
						{/snippet}
                    </CustomControl>
                </FormField>
                <FormField form={lessonBasicsForm} name="minTimeUnit">
                    <CustomControl label="Cantidad Mínima de UT">
                        {#snippet children({ props })}
                            <input type="number" min=1 {...props} bind:value={$lessonBasicsData.minTimeUnit} placeholder="Introduce Mínimo de UT">
                        {/snippet}
                    </CustomControl>
                </FormField>
                <FormField form={lessonBasicsForm} name="maxTimeUnit">
                    <CustomControl label="Cantidad Máxima de UT">
                        {#snippet children({ props })}
                            <input type="number" min=0 {...props} bind:value={$lessonBasicsData.maxTimeUnit} placeholder="Introduce Máximo de UT">
                        {/snippet}
                    </CustomControl>
                </FormField>
            </div>
        </fieldset>
    </ContentBox>
    <ContentBox shadow={true}>
        <h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Alumnos</h3>
        <fieldset class="flex w-full flex-col gap-4">
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="minStudents">
                    <CustomControl label="Cantidad Mínima de Alumnos">
                        {#snippet children({ props })}
                            <input type="number" min=1 {...props} bind:value={$lessonBasicsData.minStudents} placeholder="Introduce Mínimo de Alumnos">
                        {/snippet}
                    </CustomControl>
                </FormField>
                <FormField form={lessonBasicsForm} name="maxStudents">
                    <CustomControl label="Cantidad Máxima de Alumnos">
                        {#snippet children({ props })}
                            <input type="number" min=0 {...props} bind:value={$lessonBasicsData.minTimeUnit} placeholder="Introduce Máximo de Alumnos">
                        {/snippet}
                    </CustomControl>
                </FormField>
            </div>
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="minSkillId">
					<CustomControl label="Nivel de Habilidad Mínimo" >
						{#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.minSkillId} placeholder="Selecciona Nivel de Habilidad">
							<option value="">Selecciona Nivel de Habilidad</option>
							{#each data.skillLevels as { id, skillLevel }}
							<option value={id} aria-label={skillLevel}>{skillLevel}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
				</FormField>
                <FormField form={lessonBasicsForm} name="maxSkillId">
					<CustomControl label="Nivel de Habilidad Máximo" >
						{#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.maxSkillId} placeholder="Selecciona Nivel de Habilidad">
							<option value="">Selecciona Nivel de Habilidad</option>
							{#each data.skillLevels as { id, skillLevel }}
							<option value={id} aria-label={skillLevel}>{skillLevel}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
				</FormField>
            </div>
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="minAgeGroupId">
					<CustomControl label="Grupo de Edad Mínimo" >
						{#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.minAgeGroupId} placeholder="Selecciona Grupo de Edad">
							<option value="">Selecciona Grupo de Edad</option>
							{#each data.skillLevels as { id, skillLevel }}
							<option value={id} aria-label={skillLevel}>{skillLevel}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
				</FormField>
                <FormField form={lessonBasicsForm} name="maxAgeGroupId">
					<CustomControl label="Grupo de Edad Máximo" >
						{#snippet children({ props })}
						<select {...props} bind:value={$lessonBasicsData.maxAgeGroupId} placeholder="Selecciona Grupo de Edad">
							<option value="">Selecciona Grupo de Edad</option>
							{#each data.ageGroups as { id, ageGroup }}
							<option value={id} aria-label={ageGroup}>{ageGroup}</option>
							{/each}
						</select>
						{/snippet}
					</CustomControl>
				</FormField>
            </div>
        </fieldset>
    </ContentBox>
    <ContentBox shadow={true}>
        <fieldset class="flex w-full flex-col gap-4">
            <h3 class="mb-8 border-b border-b-border font-fira text-xl font-normal">Precio Base</h3>
            <div class="formgroup">
                <FormField form={lessonBasicsForm} name="pricingMultiplierId">
                    <CustomControl label="Tipo de Multiplicador de Precio">
                        {#snippet children({ props })}
                        <select {...props} bind:value={$lessonBasicsData.pricingMultiplierId} placeholder="Selecciona Tipo de Multiplicador">
                            <option value="">Selecciona Multiplicador</option>
                            {#each timeUnits as { value, label }}
                            <option value={value} aria-label={label}>{label}</option>
                            {/each}
                        </select>
                        {/snippet}
                    </CustomControl>
                </FormField>
                <FormField form={lessonBasicsForm} name="currencyId">
                    <CustomControl label="Divisa Principal">
                        {#snippet children({ props })}
                        <select {...props} bind:value={$lessonBasicsData.pricingMultiplierId} placeholder="Selecciona la Divisa">
                            <option value="">Selecciona Divisa Principal</option>
                            {#each data.currencies as { id, currency }}
                            <option value={id} aria-label={currency}>{currency}</option>
                            {/each}
                        </select>
                        {/snippet}
                    </CustomControl>
                </FormField>
                <FormField form={lessonBasicsForm} name="basePrice">
                    <CustomControl label="Precio Base">
                        {#snippet children({ props })}
                            <input type="number" min=0 {...props} bind:value={$lessonBasicsData.basePrice} placeholder="Introduce el Precio Base">
                        {/snippet}
                    </CustomControl>
                </FormField>
            </div>
        </fieldset>
    </ContentBox>

    <ContentBox shadow={true}>
        <CoolCta type="submit">Guardar Datos del Servicio</CoolCta>
    </ContentBox>
</form>