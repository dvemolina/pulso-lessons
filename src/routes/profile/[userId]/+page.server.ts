import { UserService } from "$src/features/Users/lib/UserService";
import type { PageServerLoad } from "./$types";
import { LessonService } from "$src/features/Lessons/lib/LessonService";
import { fetchAllLists } from "$src/lib/utils/lists";


const userService = new UserService();
const lessonService = new LessonService();

export const load: PageServerLoad = async (event) => {
    const profileUserId = event.params.userId

    const profileData = await userService.getUserById(Number(profileUserId));
    const services = await lessonService.getUserLessons(Number(profileUserId))
    
    const lists = await fetchAllLists();
    

    return { profileData, services, lists }
};