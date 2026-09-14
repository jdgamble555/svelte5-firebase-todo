import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeServerApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);


export const firebaseServer = async () => {

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken: undefined
    });

    return getFirestore(serverApp);
};