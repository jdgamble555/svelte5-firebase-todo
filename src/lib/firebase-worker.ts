import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, onIdTokenChanged, type User } from "firebase/auth";

const firebase_config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

const workerApp = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

const auth = getAuth(workerApp);


const getUser = async () => {

    return new Promise<User | null>((resolve, reject) => {
        const unsubscribe = onIdTokenChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, (error) => {
            unsubscribe();
            reject(error);
        });
    });
}    

export const getIdTokenPromise = async () => {

    const user = await getUser();

    if (!user) {
        return null;
    }
    return await user.getIdToken();
};