import { getAbout } from '$lib/about';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({
    locals: { firebase: { serverDB, serverAuth } }
}) => {

    if (!serverAuth?.currentUser) {
        error(401, 'You must be logged in to view this page!');
    }

    return {
        about: await getAbout(serverDB)
    };

}) satisfies PageServerLoad;