import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

type AboutDoc = {
    name: string;
    description: string;
};

export const getAbout = async () => {

    const aboutSnap = await getDoc(
        doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data() as AboutDoc;
};