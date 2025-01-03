import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { compareFormData, expiredSessionRedirectUrl } from "$src/lib/utils/utils";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { getAllAgeGroups, getAllCurrencies, getAllPricingModes, getAllSkillLevels, getAllSkiResorts, getAllSports, getAllTimeUnits } from "$src/lib/server/db/referenceData";
import { lessonBasicsSchema } from "$src/features/Lessons/lib/lessonValidations";
import { LessonService } from "$src/features/Lessons/lib/LessonService";

const lessonService = new LessonService();

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    const lessonId = Number(event.params.serviceId);

    if(!session || !user) {
        throw redirect(302, expiredSessionRedirectUrl(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
    }

    const lessonData = await lessonService.getLessonById(lessonId)
    //Get the Service with the Id in the url and initialize the form
    const lessonBasicsForm = await superValidate(lessonData, zod(lessonBasicsSchema))

    const resorts = await getAllSkiResorts();
    const sports = await getAllSports();
    const skillLevels = await getAllSkillLevels();
    const ageGroups = await getAllAgeGroups();
    const currencies = await getAllCurrencies();
    const timeUnits = await getAllTimeUnits();
    const pricingModes = await getAllPricingModes();

    return { lessonBasicsForm, resorts, sports, skillLevels, ageGroups, currencies, timeUnits, pricingModes }
};

export const actions: Actions = {
    lessonBasics: async (event) => {
        const user = event.locals.user;
        const session = event.locals.session;
        const lessonId = Number(event.params.serviceId);
        const currentLesson = await lessonService.getLessonById(lessonId);

        console.log('This is the lesson Id: ', lessonId)

        if(!session || !user) {
            throw redirect(302, expiredSessionRedirectUrl(event, 'La sesión ha caducado. Accede para modificar tus Servicios'))
        }
        const form = await superValidate(event.request, zod(lessonBasicsSchema));
        
        form.data.id = lessonId;
        form.data.userId = user.id;
        if (currentLesson.isBaseLesson) form.data.isBaseLesson = true
        
        if(!form.valid) {
            return fail(400, { form })
        }

        if(!currentLesson.isBaseLesson && !currentLesson) {
            //HERE SHOULD CREATE A NEW SERVICE ALSO AFTER CHECK !isBaseLesson and !currentLesson EXISTS
            //For Now just return
            return { form }
        }
        
        //COMPARE FORM BEFORE UPDATED TO GET THE UPDATED FIELDS
        const previousForm = await superValidate(currentLesson, zod(lessonBasicsSchema))
        const updatedFields = compareFormData(previousForm.data, form.data);
        console.log('The updated Fields are: ', updatedFields)
        
        const updatedLesson = await lessonService.updateLesson(updatedFields, lessonId)
        console.log('Lesson Updated Successfully', updatedLesson);

        const updatedForm = await superValidate(updatedLesson, zod(lessonBasicsSchema));

        return { updatedForm }
        
    }
};