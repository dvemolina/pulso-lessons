import { userProfileSchema } from "$src/features/Users/lib/userValidations";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { UserService } from "$src/features/Users/lib/UserService";
import { error, redirect } from "@sveltejs/kit";
import { expiredSessionRedirect, parsePhoneNumber } from "$src/lib/utils/utils";
import { StorageService } from "$src/lib/utils/cloudflareR2";

const userService = new UserService();
const storageService = new StorageService()
let activeUser :{
    id: number,
    name: string,
    profileImage: string | null,
} | null | undefined = $state();

export const load: PageServerLoad = async (event) => {
    activeUser = event.locals.user
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
        const formData = await request.formData();
        console.log('Raw form data received:', Object.fromEntries(formData));

        // Clone the form data and handle the file
        const clonedFormData = new FormData();
        for (const [key, value] of formData.entries()) {
            if (key === 'profileImage' && value instanceof File) {
                // Convert File to buffer and then to base64
                const arrayBuffer = await value.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64 = `data:${value.type};base64,${buffer.toString('base64')}`;
                clonedFormData.append(key, base64);
            } else {
                clonedFormData.append(key, value);
            }
        }

        const form = await superValidate(clonedFormData, zod(userProfileSchema));
        
        if (!form.valid) {
            console.log('Validation errors:', form.errors);
            return fail(400, { form });
        }

        try {
            
            if (form.data.profileImage && form.data.profileImage.startsWith('data:image')) {
                const imageUrl = await storageService.uploadImage(
                    form.data.profileImage,
                    activeUser.id,
                    activeUser.name
                );

                form.data.profileImage = imageUrl;
            }

            console.log('Final form data to save:', form.data);
            // await userService.updateUser(form.data);

            return { form };
        } catch (error) {
            console.error('Error processing profile update:', error);
            return fail(500, { form });
        }
    }
};