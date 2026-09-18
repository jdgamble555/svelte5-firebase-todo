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
    Timestamp,
    type FirestoreDataConverter,
    updateDoc
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { dev } from "$app/environment";
import { auth, db } from "./firebase";
import { getUser } from "./use-user.svelte";


export const generateText = () =>
    doc(collection(db, 'todos'))
        .id
        .substring(0, 10)
        .toLowerCase();
        

const todoConverter: FirestoreDataConverter<Todo> = {
    toFirestore(todo) {
        return todo;
    },

    fromFirestore(snapshot, options): Todo {

        const data = snapshot.data(options);

        const createdAt = data.createdAt as Timestamp

        return {
            id: snapshot.id,
            uid: data.uid,
            text: data.text,
            complete: data.complete,
            createdAt: createdAt.toDate()
        };
    }
};

export const useTodos = () => {

    const user = getUser();

    let todos = $state<{
        value: {
            data: Todo[],
            loading: boolean,
            error: FirebaseError | null
        }

    }>({
        value: {
            data: [],
            loading: true,
            error: null
        }
    });

    $effect(() => {

        const currentUser = user.value.data;

        if (!currentUser) {
            todos.value = {
                loading: false,
                data: [],
                error: null
            };

            return;
        }

        return onSnapshot(
            query(
                collection(db, 'todos'),
                where('uid', '==', currentUser.uid),
                orderBy('createdAt')
            ).withConverter(todoConverter),
            (snapshot) => {
                const data = snapshot.docs.map((doc) =>
                    doc.data({
                        serverTimestamps: 'estimate'
                    })
                );

                if (dev) {
                    console.log(data);
                }

                todos.value = {
                    loading: false,
                    data,
                    error: null
                };
            },
            (error) => {
                todos.value = {
                    loading: false,
                    data: [],
                    error
                };
            }
        );
    });

    return todos;
};

export const addTodo = async (text: string) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('No user!');
    }

    try {
        await setDoc(
            doc(collection(db, 'todos')),
            {
                uid: user.uid,
                text,
                complete: false,
                createdAt: serverTimestamp()
            }
        );
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);

            return {
                error: e.message
            };
        }

        throw e;
    }
};

export const updateTodo = async (
    id: string,
    newStatus: boolean
) => {
    try {
        await updateDoc(
            doc(db, 'todos', id),
            {
                complete: newStatus,
                updatedAt: serverTimestamp()
            }
        );
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);

            return {
                error: e.message
            };
        }

        throw e;
    }
};

export const deleteTodo = async (id: string) => {
    try {
        await deleteDoc(
            doc(db, 'todos', id)
        );
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);

            return {
                error: e.message
            };
        }

        throw e;
    }
};