import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { expiredSessionRedirect } from "$src/lib/utils/utils";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { getAllAgeGroups, getAllSkillLevels, getAllSkiResorts, getAllSports } from "$src/lib/server/db/querys";
import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;

    if(!session || !user) {
        redirect(403, expiredSessionRedirect(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
    }

    //Get the Service with the Id in the url and initialize the form
    const lessonBasicsForm = await superValidate(zod(lessonBasicsSchema))

    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();

    return { lessonBasicsForm, resorts, sports, skillLevels, ageGroups }
};