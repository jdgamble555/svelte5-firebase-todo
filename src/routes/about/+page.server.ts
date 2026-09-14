import { getAbout } from '$lib/about';
import type { PageServerLoad } from './$types';


export const load = (async () => {

    const about = await getAbout();

    return { about };

}) satisfies PageServerLoad;