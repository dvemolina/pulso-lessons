import { userProfileSchema } from "$src/features/Users/lib/userValidations";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { UserService } from "$src/features/Users/lib/UserService";
import { error, redirect } from "@sveltejs/kit";
import { expiredSessionRedirect, parsePhoneNumber } from "$src/lib/utils/utils";

const userService = new UserService();
export const load: PageServerLoad = async (event) => {
    const activeUser = event.locals.user
    const session = event.locals.session
    
    if(!activeUser || !session) {
        redirect(403, expiredSessionRedirect(event, 'La sesión ha caducado. Accede para visitar tu Dashboard'))
    }
    const userId = activeUser.id;

    const dbUser = await userService.getUserById(userId)
    if(!dbUser) {
        return error(400, 'El usuario registrado no existe en el sistema')
    }

    let parsedPhone;
    if(dbUser.phone) {
        parsedPhone = parsePhoneNumber(dbUser.phone)
    }

    const userData = {...dbUser, phone_number: parsedPhone?.number, country_code: parsedPhone?.prefix}
    const form = await superValidate(userData, zod(userProfileSchema))

    return { form }
}
export const actions: Actions = {
    userProfile: async ({ request }) => {
        const form = await superValidate(request, zod(userProfileSchema));
        if(!form.valid) {
            console.log('Form is invalid')
            return fail(400, form)
        }

        console.log('The form is correct: ', form.data)
        return { form }
    }
};