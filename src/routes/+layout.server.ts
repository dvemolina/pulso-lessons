import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = async ({ locals }) => {
    
    const user = locals.user;
    console.log('USER (in routes/+layout.server.ts: ', user)
    return { user: user || null}
};