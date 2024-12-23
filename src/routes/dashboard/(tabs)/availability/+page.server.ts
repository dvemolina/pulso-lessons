import { fail, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { compareFormData, expiredSessionRedirect } from "$src/lib/utils/utils";
import { availabilitySchema } from "$src/features/Instructors/lib/instructorValidations";
import { zod } from "sveltekit-superforms/adapters";
import { AvailabilityService } from "$src/features/Availability/lib/AvailabilityService";
import { redirect, type Actions } from "@sveltejs/kit";

const availabilityService = new AvailabilityService()

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;

    if(!user || !session) {
        redirect(403, expiredSessionRedirect(event, 'La sesión ha caducado. Accede para modificar tu Disponibilidad'))
    }

    const userId = user?.id;
    const userAvailability = await availabilityService.getAvailabilityByUserId(userId)
    
    const form = await superValidate(userAvailability, zod(availabilitySchema))
    
    return { form }
};

export const actions: Actions = {
    generalAvailability: async (event) => {

    const user = event.locals.user;
    const session = event.locals.session;

    if(!user || !session) {
        redirect(403, expiredSessionRedirect(event, 'La sesión ha caducado. Accede para modificar tu Disponibilidad'))
    }
    const currentAvailability = await availabilityService.getAvailabilityByUserId(user.id);
    const initialForm = await superValidate(currentAvailability, zod(availabilitySchema));

    const form  = await superValidate(event.request, zod(availabilitySchema));
    if(!form.valid){
        return fail(400, { form })
    }

    const updatedAvailability = compareFormData(initialForm.data, form.data);

    console.log('UPDATED AVAILABILITY: ', updatedAvailability)
    return { form }
}
};