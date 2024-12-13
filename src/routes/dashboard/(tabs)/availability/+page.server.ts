import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { availabilitySchema } from "$src/features/availability/schemas/availabilityFormValidation";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(availabilitySchema))
    return { form }
};

export const actions: Actions = {
    default: async (event) => {

        const form = await superValidate(event.request, zod(availabilitySchema));
        
        if (!form.valid) {
            console.log("Form invalid:", form.errors);
            return { form };
        }

        console.log('FORM DATA', form.data)

        return { form, success: true };
    }
}