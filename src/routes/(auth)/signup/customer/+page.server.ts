import type { PageServerLoad } from "./$types";
import { userSignupSchema } from "$src/features/Users/lib/userValidation";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";
import { UserService } from "$src/features/Users/lib/UserService";
import type { InsertUser } from "$src/lib/server/db/schemas/users";

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

        const formatedPhone = `${form.data.country_code}${form.data.phone}`;

        delete form.data.country_code;
        delete form.data.phone;
        delete form.data.confirm_password;

        const userData: InsertUser = { ...form.data, phone: formatedPhone, role: 1} 

        console.log('The formatted User Data is: ', userData)

        const newUser = await userService.registerUser(userData);
        console.log('NEW USER CREATED: ', newUser)

        //Service for Checking if Email Exists Already and Creating User = CreateUser
        return message( form, `Bienvenid@ ${userData.name} ¡Cuenta Creada Exitósamente!`)
    }
};