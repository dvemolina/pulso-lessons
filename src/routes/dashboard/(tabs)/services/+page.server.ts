import { LessonService } from "$src/features/Lessons/lib/LessonService";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { expiredSessionRedirectUrl } from "$src/lib/utils/utils";

const lessonService = new LessonService()

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    
    if(!session || !user) {
        throw redirect(302, expiredSessionRedirectUrl(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
    }
    
    const lessons = await lessonService.getUserLessons(user.id)
    return { user, lessons, }
};