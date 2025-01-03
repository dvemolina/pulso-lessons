import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";
import { userSignupSchema } from "$src/features/Users/lib/userValidations";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$src/lib/server/auth";
import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";
import { getAllAgeGroups, getAllCurrencies, getAllPricingModes, getAllSkillLevels, getAllSkiResorts, getAllSports, getAllTimeUnits } from "$src/lib/server/db/querys";
import { LessonService } from "$src/features/Lessons/lib/LessonService";
import { availabilitySchema } from "$src/features/Availability/lib/availabilityValidation";
import { AvailabilityService } from "$src/features/Availability/lib/AvailabilityService";




const userService = new UserService()
const availabilityService = new AvailabilityService()
const lessonService = new LessonService()

export const load: PageServerLoad = async () => {
    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();
    const currencies = await getAllCurrencies();
    const pricingModes = await getAllPricingModes();
    const timeUnits = await getAllTimeUnits();

    const signupForm = await superValidate(zod(userSignupSchema));
    const availabilityForm = await superValidate(zod(availabilitySchema))
    const lessonBasicsForm = await superValidate(zod(lessonBasicsSchema));
    return { signupForm, availabilityForm, lessonBasicsForm, resorts, sports, skillLevels, ageGroups, currencies, pricingModes, timeUnits }
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
            const newUser =  await userService.registerUserWithPassword(form.data, 2);

            if(newUser) {
                const sessionToken = generateSessionToken();
                const session = await createSession(sessionToken, newUser.id);
                setSessionTokenCookie(event, sessionToken, session.expiresAt);
    
                return {form, userId: newUser.id, userName: newUser.name}
            }

        } catch (error: unknown){
            console.error('Unexpected error: ', error);
            return fail(500, { form, error: 'Error interno del servidor. Intenta más tarde.' });
        }
    },

    availability: async (event) => {
        const user = event.locals.user;
        const form = await superValidate(event.request, zod(availabilitySchema))
        if (!form.valid) {
            return fail (400, { form })
        }
        if(!user) {
            console.log('USER DOES NOT EXIST ON LESSON SUBMISSION')
            return fail(400, { form })
        }
        const availabilityData = {...form.data, userId: user.id}
        await availabilityService.createAvailability(availabilityData);
        console.log('Created Availability fields: ', form.data)
        
        return { form }
    },

    lessonBasics: async (event) => {
        const user = event.locals.user;
        const form = await superValidate(event.request, zod(lessonBasicsSchema));
    
        if (!form.valid) {
            console.log('FORM NOT VALID')
            return fail(400, { form })
        }
        if(!user) {
            console.log('USER DOES NOT EXIST ON LESSON SUBMISSION')
            return fail(400, { form })
        }

        form.data.isBaseLesson = true

        const createdLesson = await lessonService.createLesson(form.data, user.id)
        console.log('LESSON CREATED SUCCESSFULLY: ', createdLesson);

        return { form }

     }
};