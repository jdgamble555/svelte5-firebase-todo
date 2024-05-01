import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from "firebase/auth";
import { auth } from "./firebase";
import { useSharedStore } from "./use-shared.svelte";
import { onDestroy } from "svelte";
import { rune } from "./rune.svelte";

export const loginWithGoogle = async () =>
    await signInWithPopup(auth, new GoogleAuthProvider());

export const logout = async () =>
    await signOut(auth);

const _useUser = () => {

    const user = rune<{
        loading: boolean,
        data: UserType | null,
        error: Error | null
    }>({
        loading: true,
        data: null,
        error: null
    });

    const unsubscribe = onIdTokenChanged(
        auth,
        (_user: User | null) => {

            // not logged in
            if (!_user) {
                user.value = {
                    loading: false,
                    data: null,
                    error: null
                };
                return;
            }

            // logged in
            const { displayName, photoURL, uid, email } = _user;
            user.value = {
                loading: false,
                data: { displayName, photoURL, uid, email },
                error: null
            };
        }, (error) => {

            // error
            user.value = {
                loading: false,
                data: null,
                error
            };
        });

    onDestroy(unsubscribe);

    return user;
};

export const useUser = (defaultUser: UserType | null = null) =>
    useSharedStore('user', _useUser, defaultUser);