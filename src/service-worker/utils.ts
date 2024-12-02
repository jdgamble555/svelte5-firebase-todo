import { getIdTokenPromise } from "$lib/firebase-worker";

export const getOriginFromUrl = (url: string): string => {
    const [protocol, , host] = url.split('/');
    return `${protocol}//${host}`;
};

// Get underlying body if available. Works for text and json bodies.
export const getBodyContent = async (req: Request): Promise<BodyInit | null | undefined> => {

    if (req.method === 'GET') {
        return null;
    }
    try {
        if (req.headers.get('Content-Type')?.includes('json')) {
            const json = await req.json();
            return JSON.stringify(json);
        }
        return await req.text();
        
    } catch {
        return null;
    }
};

export const requestProcessor = async (event: FetchEvent) => {

    let req = event.request;

    const idToken = await getIdTokenPromise();

    if (
        self.location.origin === getOriginFromUrl(event.request.url) &&
        (self.location.protocol === 'https:' || self.location.hostname === 'localhost') &&
        idToken
    ) {
        const headers = new Headers(req.headers);
        headers.append('Authorization', 'Bearer ' + idToken);
        const body = await getBodyContent(req);

        try {
            req = new Request(req.url, {
                method: req.method,
                headers: headers,
                mode: 'same-origin',
                credentials: req.credentials,
                cache: req.cache,
                redirect: req.redirect,
                referrer: req.referrer,
                body,
            });
        } catch {
            // This will fail for CORS requests. We just continue with the fetch logic without passing the ID token.
        }
    }

    return await fetch(req);
};