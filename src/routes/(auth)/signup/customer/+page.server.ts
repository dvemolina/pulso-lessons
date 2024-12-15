import type { PageServerLoad } from "./$types";
import { userSignupSchema } from "$src/features/Users/lib/userValidation";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";


const userService = new UserService()

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(userSignupSchema));
    return { form }
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(userSignupSchema))
        console.log(form)

        if(!form.valid) {
            return fail(400, { form })
        }

        console.log("FORM SUCCESSFULLY SUBMITTED. DATA is: ", form.data)
        
        try {
            await userService.registerUserWithPassword(form.data);
            redirect(302, '/signup/success')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any){
            if (e.message === 'EmailExists') {
                return setError(form, 'email', 'Este correo ya existe',  {status: 409})
            }

            console.error('Unexpected error: ', e);
            return fail(500, { form, error: 'Error interno del servidor. Intenta más tarde.' });
        }
    }
};