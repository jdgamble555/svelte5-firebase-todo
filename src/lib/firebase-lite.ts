import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const serverApp = initializeApp(firebase_config);

// !!! This is imported from `firestore/lite` directory for smaller server imports
export const serverDB = getFirestore(serverApp);
