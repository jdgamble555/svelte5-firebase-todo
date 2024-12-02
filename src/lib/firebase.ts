import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useSharedStore } from './use-shared';

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

// client setup
const _useFirebase = () => {

    const app = getApps().length
        ? getApp()
        : initializeApp(firebase_config);

    const auth = getAuth(app);
    const db = getFirestore(app);

    return {
        auth,
        db,
        app
    };
};

export const useFirebase = () =>
    useSharedStore('firebase', _useFirebase);