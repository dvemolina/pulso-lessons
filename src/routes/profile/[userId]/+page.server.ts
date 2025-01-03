import { UserService } from "$src/features/Users/lib/UserService";
import type { PageServerLoad } from "./$types";
import { LessonService } from "$src/features/Lessons/lib/LessonService";


const userService = new UserService();
const lessonService = new LessonService();

export const load: PageServerLoad = async (event) => {
    const profileUserId = event.params.userId

    const profileData = await userService.getUserById(Number(profileUserId));
    const services = await lessonService.getUserLessons(Number(profileUserId))
    
    

    return { profileData, services }
};