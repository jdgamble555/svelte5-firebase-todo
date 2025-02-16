import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
    QueryDocumentSnapshot,
    type SnapshotOptions,
    Timestamp,
    type PartialWithFieldValue,
    type SetOptions
} from "firebase/firestore";
import { useUser } from "./use-user.svelte";
import { FirebaseError } from "firebase/app";
import { untrack } from "svelte";
import { rune } from "./rune.svelte";
import { dev } from "$app/environment";
import { useFirebase } from "./use-firebase";

export const useGenerateText = () => {

    const { db } = useFirebase();

    // generate text from ID
    const generateText = () => doc(collection(db, 'todos'))
        .id.substring(0, 10).toLowerCase();

    return {
        generateText
    };
};

const todoConverter = {
    toFirestore(value: PartialWithFieldValue<Todo>, options?: SetOptions) {
        const isMerge = options && 'merge' in options;
        return {
            ...value,
            [isMerge ? 'updatedAt' : 'createdAt']: serverTimestamp()
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        const createdAt = data.createdAt as Timestamp;
        return {
            ...data,
            id: snapshot.id,
            createdAt: createdAt.toDate()
        } as Todo;
    }
};

export const useTodos = () => {

    const { db } = useFirebase();
    const user = useUser();

    let _todos = rune<{
        data: Todo[],
        loading: boolean,
        error: FirebaseError | null
    }>({
        data: [],
        loading: true,
        error: null
    });

    $effect(() => {

        const _user = user.value.data;

        // filtering todos depend on user
        if (!_user) {
            untrack(() => {
                _todos.value = {
                    loading: false,
                    data: [],
                    error: null
                };
            });
            return;
        }

        return onSnapshot(
            query(
                collection(db, 'todos'),
                where('uid', '==', _user.uid),
                orderBy('createdAt')
            ).withConverter<Todo>(todoConverter), (q) => {

                if (q.empty) {
                    _todos.value = {
                        loading: false,
                        data: [],
                        error: null
                    };
                }

                // id is added in converter
                const data = q.docs.map(doc => doc.data({
                    serverTimestamps: 'estimate'
                }));

                if (dev) {
                    console.log(data);
                }

                _todos.value = {
                    loading: false,
                    data,
                    error: null
                };

            }, (error) => {

                // Handle error
                _todos.value = {
                    loading: false,
                    data: [],
                    error
                };
            });
    });
    return _todos;
};

export const useAddTodo = () => {

    const { db, auth } = useFirebase();

    const addTodo = async (text: string) => {
        const user = auth.currentUser;
        if (!user) {
            throw 'No user!';
        }
        try {
            await setDoc(doc(collection(db, 'todos'))
                .withConverter(todoConverter), {
                uid: user.uid,
                text,
                complete: false
            });
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
                return {
                    error: e.message
                };
            }
        }
    };

    return { addTodo };
};

export const useUpdateTodo = () => {

    const { db } = useFirebase();

    const updateTodo = async (
        id: string,
        newStatus: boolean
    ) => {
        try {
            await setDoc(
                doc(db, 'todos', id),
                { complete: newStatus },
                { merge: true }
            );
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
                return {
                    error: e.message
                };
            }
        }
    };

    return {
        updateTodo
    };
};

export const useDeleteTodo = () => {

    const { db } = useFirebase();

    const deleteTodo = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'todos', id));
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
                return {
                    error: e.message
                };
            }
        }
    };

    return {
        deleteTodo
    };
};
