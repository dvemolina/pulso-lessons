import { UserService } from "$src/features/Users/lib/UserService";
import type { PageServerLoad } from "./$types";

const userService = new UserService();

export const load: PageServerLoad = async (event) => {
    const profileUserId = event.params.userId
    console.log('EVENT PARAMS: ', profileUserId)
    const profileData = await userService.getUserById(Number(profileUserId));
   
    return { profileData }
};