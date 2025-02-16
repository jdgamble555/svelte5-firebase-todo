import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from "firebase/auth";
import { useFirebase } from "./use-firebase";
import { useShared } from "./use-shared";
import { onDestroy } from "svelte";
import { rune } from "./rune.svelte";

export const useAuth = () => {

    const { auth } = useFirebase();

    const loginWithGoogle = async () => {
        return await signInWithPopup(
            auth,
            new GoogleAuthProvider()
        );
    };

    const logout = async () => {
        return await signOut(auth);
    };

    return {
        loginWithGoogle,
        logout
    };
};


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

    const { auth } = useFirebase();

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
    useShared('user', _useUser, defaultUser);