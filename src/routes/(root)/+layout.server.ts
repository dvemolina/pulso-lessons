import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({url}) => {
    const pathname = url.pathname
    return { pathname }

    
};