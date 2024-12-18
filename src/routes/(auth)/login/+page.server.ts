import { userLoginSchema } from "$src/features/Users/lib/userValidations";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";
import * as auth from "$src/lib/server/auth";
import { verifyPassword } from "$src/lib/utils/bcrypt";

const userService = new UserService()

export const load: PageServerLoad = async ({ locals }) => {
    const session = locals.session;
    const user = locals.user;
    if (user && session) {
        throw redirect(302, '/dashboard')
    }

    const form = await superValidate(zod(userLoginSchema));
    return { form }
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod(userLoginSchema))
        if (!form.valid) {
            return fail(400, { form })
        }

        const user = await userService.getUserByEmail(form.data.email);

        if(!user) {
            return setError(form, 'email', 'No existe usuario con este correo',  {status: 409})
        }

        const passwordMatch = await verifyPassword(form.data.password, user.password )
        if(!passwordMatch) {
            return setError(form, 'password', 'Contraseña incorrecta', {status: 409})
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, user.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    
        redirect (302, '/dashboard')
    }
    
};