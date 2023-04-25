import { doc } from "firebase/firestore";
import { db } from "./App";
import { getDoc } from "firebase/firestore";

export const getUserDetails = async (collectionName, auth) => {
    let docRef = doc(db, collectionName, auth.currentUser.uid);
    let res = await getDoc(docRef);
    return res.data();
}
