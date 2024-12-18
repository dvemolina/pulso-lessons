<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';

	// the form object
	type T = Record<string, unknown>;
	// the path/name of the field in the form object
	type U = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Field, type FieldProps, FieldErrors, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';

	let { form, description, name, children: childrenProp }: FieldProps<T, U> & {description?: string} = $props();
</script>
<div class="flex flex-col gap-3 w-full">
    <Field {form} {name}>
        {#snippet children(snippetProps)}
		{@render childrenProp(snippetProps)}
		<FieldErrors />
        {/snippet}
    </Field>
</div>
