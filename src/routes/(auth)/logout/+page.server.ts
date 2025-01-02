import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$src/lib/server/auth";

export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;

    if(!session) {
       return redirect (404, '/');
    };

    await invalidateSession(session.id);
    deleteSessionTokenCookie(event);

    throw redirect (302, '/')
};