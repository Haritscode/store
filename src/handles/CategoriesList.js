import { db } from "../firebase_setup/firebase";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "@firebase/firestore";
const categoriesList=(id)=>{
    const query=collection(db,`users/${id}/categories`);
    return useCollectionData(query);
}
export default categoriesList;