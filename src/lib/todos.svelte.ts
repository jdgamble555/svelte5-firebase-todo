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
import { auth, db } from "./firebase";
import { useUser } from "./user.svelte";
import { FirebaseError } from "firebase/app";
import { untrack } from "svelte";
import { rune } from "./rune.svelte";

export const genText = () => Math.random().toString(36).substring(2, 15);

const todoConverter = {
    toFirestore(value: PartialWithFieldValue<Todo>, options?: SetOptions) {
        const isMerge = options && 'merge' in options;
        if (!auth.currentUser) {
            throw 'User not logged in!';
        }
        return {
            ...value,
            uid: auth.currentUser.uid,
            [isMerge ? 'updated' : 'created']: serverTimestamp()
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        const created = data.created as Timestamp;
        return {
            ...data,
            id: snapshot.id,
            created: created.toDate()
        } as Todo;
    }
};

export const useTodos = (
    todos: Todo[] | null = null
) => {

    const _todos = rune(todos);

    $effect(() => {

        const user = useUser();

        // filtering todos depend on user
        if (!user.value) {
            untrack(() => {
                _todos.value = null;
            });
            return;
        }

        const unsubscribe = onSnapshot(
            query(
                collection(db, 'todos'),
                where('uid', '==', user.value.uid),
                orderBy('created')
            ).withConverter<Todo>(todoConverter), (q) => {
                untrack(() => {
                    _todos.value = q.empty ? [] : q.docs.map(doc => doc.data({
                        serverTimestamps: 'estimate'
                    }));
                });
            });

        return () => {
            console.log('unsub test');
            unsubscribe();
        };

    });

    return _todos;
};

export const addTodo = async (text: string) => {

    setDoc(doc(collection(db, 'todos')).withConverter(todoConverter), {
        text,
        complete: false
    }).catch((e) => {
        if (e instanceof FirebaseError) {
            console.error(e.code)
        }
    });
}

export const updateTodo = async (id: string, newStatus: boolean) => {

    try {
        await setDoc(
            doc(db, 'todos', id).withConverter(todoConverter),
            { complete: newStatus },
            { merge: true }
        );
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e.code);
        }
    }
}

export const deleteTodo = (id: string) => {
    deleteDoc(doc(db, 'todos', id));
}
