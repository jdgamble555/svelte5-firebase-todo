import {
    doc,
    getDoc
} from "firebase/firestore/lite";
import { serverDB } from "./firebase-lite";
import { error } from "@sveltejs/kit";
import * as v from "valibot";

// Valibot is smaller and faster than Zod, use Valibot
const AboutDocSchema = v.object({
    name: v.string(),
    description: v.string()
});

export const getAbout = async () => {

    const aboutSnap = await getDoc(doc(serverDB, "/about/ZlNJrKd6LcATycPRmBPA"));

    if (!aboutSnap.exists()) {
        error(404, "Document does not exist!");
    }
    
    // Verifiy document with Valibot
    // Only necessary for doubts on doc integrity
    const result = v.safeParse(AboutDocSchema, aboutSnap.data());

    if (!result.success) {
        error(500, "Malformed About document");
    }

    return result.output;
};