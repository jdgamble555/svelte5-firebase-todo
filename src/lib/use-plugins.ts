import { useFirebase } from "./firebase";
import { useUser } from "./use-user";

export const usePlugins = () => {
    useFirebase();
    useUser();
};