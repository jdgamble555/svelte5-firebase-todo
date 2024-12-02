import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);


export const firebaseServer = async (request: Request) => {

    const authIdToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });

    const serverAuth = getAuth(serverApp);
    await serverAuth.authStateReady();

    const serverDB = getFirestore(serverApp);

    return {
        serverAuth,
        serverDB
    };
};