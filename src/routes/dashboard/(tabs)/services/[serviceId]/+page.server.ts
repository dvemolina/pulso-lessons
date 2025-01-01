import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { expiredSessionRedirectUrl } from "$src/lib/utils/utils";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { getAllAgeGroups, getAllCurrencies, getAllSkillLevels, getAllSkiResorts, getAllSports } from "$src/lib/server/db/querys";
import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    const lessonId = event.params.serviceId;

    if(!session || !user) {
        redirect(403, expiredSessionRedirectUrl(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
    }

    //Get the Service with the Id in the url and initialize the form
    const lessonBasicsForm = await superValidate(zod(lessonBasicsSchema))

    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();
    const currencies = await getAllCurrencies();

    return { lessonBasicsForm, resorts, sports, skillLevels, ageGroups, currencies }
};

export const actions: Actions = {
    lessonBasics: async (event) => {
        const form = await superValidate(event.request, zod(lessonBasicsSchema));
        
        if(!form.valid) {
            return fail(400, { form })
        }
    }
};