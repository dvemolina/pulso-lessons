import { LessonService } from "$src/features/Lessons/lib/LessonService";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { expiredSessionRedirectUrl } from "$src/lib/utils/utils";
import { getAllAgeGroups, getAllCurrencies, getAllSkillLevels, getAllSkiResorts, getAllSports } from "$src/lib/server/db/querys";

const lessonService = new LessonService()

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    
    if(!session || !user) {
        throw redirect(302, expiredSessionRedirectUrl(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
    }

    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();
    const currencies = await getAllCurrencies();
    
    const lessons = await lessonService.getUserLessons(user.id)
    return { user, lessons, sports, resorts, skillLevels, ageGroups, currencies }
};