import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { expiredSessionRedirect } from "$src/lib/utils/utils";

export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;
    const redirectTo = expiredSessionRedirect(event, "Accede a tu Cuenta para visitar el Panel de Control");
    
    if(!session) {
        console.log('NO SESSION FOUND FOR DASHBOARD')
        throw redirect(302, redirectTo)
    }

    const user = event.locals.user;
    if(!user) {
        console.log('NO USER FOUND FOR DASHBOARD')
        throw redirect(302, redirectTo)
    }


    return {user}
};