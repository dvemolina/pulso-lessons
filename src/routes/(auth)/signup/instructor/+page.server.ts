import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";
import { userSignupSchema } from "$src/features/Users/lib/userValidations";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$src/lib/server/auth";
import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";
import { getAllAgeGroups, getAllCurrencies, getAllSkillLevels, getAllSkiResorts, getAllSports } from "$src/lib/server/db/querys";




const userService = new UserService()

export const load: PageServerLoad = async () => {
    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();
    const currencies = await getAllCurrencies();

    const signupForm = await superValidate(zod(userSignupSchema));
    const lessonBasicsForm = await superValidate(zod(lessonBasicsSchema))
    return { signupForm, lessonBasicsForm, resorts, sports, skillLevels, ageGroups, currencies }
};

export const actions: Actions = {
    signup: async (event) => {
        const form = await superValidate(event.request, zod(userSignupSchema))
        console.log(form)

        if(!form.valid) {
            return fail(400, { form })
        }

        const emailExists = await userService.getUserByEmail(form.data.email);
        if(emailExists) {
            return setError(form, 'email', 'Este correo ya existe', {status: 409})
        }
        
        try {
            const newUser =  await userService.registerUserWithPassword(form.data);

            //CREATE THE SESSION AND SET THE SESSION TOKENS
            const sessionToken = generateSessionToken();
	        const session = await createSession(sessionToken, newUser.id);
	        setSessionTokenCookie(event, sessionToken, session.expiresAt);

            return {form, userId: newUser.id}

        } catch (error: unknown){
            console.error('Unexpected error: ', error);
            return fail(500, { form, error: 'Error interno del servidor. Intenta más tarde.' });
        }
    },
};