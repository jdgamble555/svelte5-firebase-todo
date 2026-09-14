import {
    doc,
    getDoc,
    type FirestoreDataConverter
} from "firebase/firestore/lite";
import { firebaseServer } from "./firebase-lite";

const aboutConverter: FirestoreDataConverter<AboutDoc> = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot) => snapshot.data() as AboutDoc
};

export const getAbout = async () => {

    const serverDB = await firebaseServer();

    const aboutSnap = await getDoc(
        doc(serverDB, '/about/ZlNJrKd6LcATycPRmBPA').withConverter(aboutConverter)
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data()
};