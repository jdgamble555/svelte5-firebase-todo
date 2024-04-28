import { getAbout } from '$lib/about';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    return {
        about: await getAbout()
    };

}) satisfies PageServerLoad;