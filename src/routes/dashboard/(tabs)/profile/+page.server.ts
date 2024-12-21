import { userProfileSchema } from "$src/features/Users/lib/userValidations";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { UserService } from "$src/features/Users/lib/UserService";
import { error, redirect } from "@sveltejs/kit";
import { compareFormData, expiredSessionRedirect, parsePhoneNumber } from "$src/lib/utils/utils";
import { StorageService } from "$src/lib/utils/cloudflareR2";
import sharp from "sharp";

const userService = new UserService();
const storageService = new StorageService()

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user
    const session = event.locals.session
    
    if(!user || !session) {
        redirect(403, expiredSessionRedirect(event, 'La sesión ha caducado. Accede para visitar tu Dashboard'))
    }
    const userId = user.id;

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

    return { form, user}
}

export const actions: Actions = {
    userProfile: async (event) => {
        const user = event.locals.user
        const currentUser = await userService.getUserById(user.id)
        const formData = await event.request.formData();

        // Get the initial form
        let parsedPhone;
        if(currentUser.phone) {
            parsedPhone = parsePhoneNumber(currentUser.phone)
        }
        const initialData = {
            ...currentUser, 
            phone_number: parsedPhone?.number, 
            country_code: parsedPhone?.prefix
        }
        const initialForm = await superValidate(initialData, zod(userProfileSchema))

        // Process image first if it exists
        const file = formData.get('profileImage') as File | null;
        let imageUrl: string | undefined = undefined;
        
        if (file && file instanceof File && file.size > 0) {
            try {
                // Validate image type
                if (!file.type.startsWith("image/")) {
                    return fail(400, { 
                        form: initialForm,
                        message: "Solo se aceptan imágenes" 
                    });
                }

                // Process image
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const compressedImage = await sharp(buffer)
                    .rotate()
                    .resize(300, 300, { fit: "cover" })
                    .webp({ quality: 50 })
                    .toBuffer();

                // Upload to R2
                const fileName = `${currentUser.id}-${currentUser.name}-profile.webp`;
                imageUrl = await storageService.uploadImage(
                    compressedImage,
                    fileName
                );

                // Replace the File object with the URL in the form data
                formData.set('profileImage', imageUrl);
            } catch (error) {
                console.error("Error processing image:", error);
                return fail(500, { 
                    form: initialForm,
                    message: "Error al procesar la imagen." 
                });
            }
        } else {
            // If no new file, use the existing URL
            formData.set('profileImage', currentUser.profileImage || '');
        }

        // Now validate the form with processed data
        const newForm = await superValidate(formData, zod(userProfileSchema));

        if (!newForm.valid) {
            return fail(400, { form: newForm });
        }

        // Get changed fields
        const updatedFields = Object.entries(newForm.data).reduce((acc, [key, value]) => {
            if (value !== initialForm.data[key]) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, unknown>);

        // Remove profileImage from updatedFields if it's empty string or unchanged
        if (updatedFields.profileImage === '' || updatedFields.profileImage === currentUser.profileImage) {
            delete updatedFields.profileImage;
        }

        console.log('Final Updated Fields:', updatedFields);

        // Here you would update the user in the database with updatedFields
        // await userService.updateUser(user.id, updatedFields);

        return { form: newForm };
    },
};