import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals, url}) => {
    const user = locals.user
    const pathname = url.pathname

    return { pathname, user }
};