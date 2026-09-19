import {
    collection,
    deleteDoc,
    doc,
    FirestoreError,
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
import { dev } from "$app/environment";
import { auth, db } from "./firebase";
import { getUser } from "./auth.svelte";


// Only used to create example texts -- DO NOT USE IN PRODUCTION
export const generateText = () =>
    doc(collection(db, 'todos'))
        .id
        .substring(0, 10)
        .toLowerCase();


const todoConverter: FirestoreDataConverter<TodoDoc> = {
    toFirestore(todo) {
        return todo;
    },

    fromFirestore(snapshot): TodoDoc {

        // server optimistic date updates
        const data = snapshot.data({
            serverTimestamps: 'estimate'
        });

        // correctly use the date type
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
            data: TodoDoc[],
            loading: boolean,
            error: FirestoreError | null
        }

    }>({
        value: {
            data: [],
            loading: true,
            error: null
        }
    });

    $effect(() => {

        // Must be logged in
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
                const data = snapshot.docs.map(
                    (doc) => doc.data()
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
        return { error: 'No user' };
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
        return { error: null };
    } catch (e) {
        if (e instanceof FirestoreError) {
            return { error: e.message };
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
        return { error: null };
    } catch (e) {
        if (e instanceof FirestoreError) {
            return { error: e.message };
        }
        throw e;
    }
};

export const deleteTodo = async (id: string) => {
    try {
        await deleteDoc(
            doc(db, 'todos', id)
        );
        return { error: null };
    } catch (e) {
        if (e instanceof FirestoreError) {
            return { error: e.message };
        }
        throw e;
    }
};
