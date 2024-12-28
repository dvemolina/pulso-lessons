import { searchSchema } from "$src/features/Finder/searchValidations";
import { fail, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { getAllSkiResorts, getAllSports } from "$src/lib/server/db/querys";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals}) => {
    const form = await superValidate(zod(searchSchema))
    const sports = await getAllSports();
    const resorts = await getAllSkiResorts();
    const user = locals.user

    return { form, sports, resorts, user }
};

export const actions: Actions = {
    default: async ({request}) => {
        const form = await superValidate(request, zod(searchSchema));
        if(!form.valid) {
            return fail(400, { form })
        }

        //Implement the Search functionality

        console.log('Validation passed. The submitted data is: ', form.data)
        return { form }
    }
};