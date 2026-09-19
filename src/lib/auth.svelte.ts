import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import { getContext, onDestroy, setContext } from "svelte";
import { auth } from "./firebase";

// User context key
const USER_KEY = Symbol('user');

export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        return { error: null };
    } catch (error) {
        if (error instanceof FirebaseError) {
            return { error: error.message };
        }
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        if (error instanceof FirebaseError) {
            return { error: error.message };
        }
        throw error;
    }
};

export const setUser = () => {

    const user = $state<{ value: UserState }>({
        value: {
            loading: true,
            data: null
        }
    });

    // Create user listener
    const unsubscribe = onIdTokenChanged(
        auth,
        (_user: User | null) => {

            // not logged in
            if (!_user) {
                user.value = {
                    loading: false,
                    data: null
                };
                return;
            }

            // logged in
            const { displayName, photoURL, uid, email } = _user;
            user.value = {
                loading: false,
                data: { displayName, photoURL, uid, email }
            };
        });

    setContext(USER_KEY, user);

    onDestroy(unsubscribe);

    return user;
};

export const getUser = () => {
    return getContext<{ value: UserState }>(USER_KEY);
};
