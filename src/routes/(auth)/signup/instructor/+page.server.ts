import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";
import { userSignupSchema } from "$src/features/Users/lib/userValidations";
import { availabilitySchema } from "$src/features/Instructors/lib/instructorValidations";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$src/lib/server/auth";




const userService = new UserService()

export const load: PageServerLoad = async () => {
    const signupForm = await superValidate(zod(userSignupSchema));
    const availabilityForm = await superValidate(zod(availabilitySchema))
    return { signupForm, availabilityForm }
};

export const actions: Actions = {
    signup: async (event) => {
        const form = await superValidate(event.request, zod(userSignupSchema))
        console.log(form)

        if(!form.valid) {
            return fail(400, { form })
        }

        console.log("FORM SUCCESSFULLY SUBMITTED. DATA is: ", form.data)
        
        try {
            const newUser =  await userService.registerUserWithPassword(form.data);

            //CREATE THE SESSION AND SET THE SESSION TOKENS
            const sessionToken = generateSessionToken();
	        const session = await createSession(sessionToken, newUser.id);
	        setSessionTokenCookie(event, sessionToken, session.expiresAt);

            return {form, userId: newUser.id}

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any){
            if (e.message === 'EmailExists') {
                return setError(form, 'email', 'Este correo ya existe',  {status: 409})
            }

            console.error('Unexpected error: ', e);
            return fail(500, { form, error: 'Error interno del servidor. Intenta más tarde.' });
        }
    },
};