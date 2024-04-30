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

const _useUser = (defaultUser: UserType | null = null) => {

    const user = rune(defaultUser);

    const unsubscribe = onIdTokenChanged(
        auth,
        (_user: User | null) => {
            if (!_user) {
                user.value = null;
                return;
            }
            const { displayName, photoURL, uid, email } = _user;
            user.value = { displayName, photoURL, uid, email };
        });

    onDestroy(unsubscribe);

    return user;
};

export const useUser = (defaultUser: UserType | null = null) =>
    useSharedStore('user', _useUser, defaultUser);