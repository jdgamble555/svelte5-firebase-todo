import { firebaseServer } from "$lib/firebase-lite";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    // setup firebase to be accessible everywhere
    event.locals.firebase = await firebaseServer(event.request);

    return resolve(event);
};