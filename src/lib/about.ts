import {
    doc,
    getDoc,
    type Firestore
} from "firebase/firestore/lite";

type AboutDoc = {
    name: string;
    description: string;
};

export const getAbout = async (serverDB: Firestore) => {

    const aboutSnap = await getDoc(
        doc(serverDB, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data() as AboutDoc;
};