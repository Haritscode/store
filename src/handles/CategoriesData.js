import { collection, where,query } from '@firebase/firestore';
import { db } from '../firebase_setup/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const categoriesData=(id,categoryName)=>{
    const collectionRef=collection(db,`users/${id}/inventory`);
    let q="";
    if(categoryName==='all')
    {
        q=query(collectionRef,where('showInStoreFront','==',true))
    }
    else{
        q=query(collectionRef,where('category','==',categoryName),where('showInStoreFront','==',true));
    }
    return useCollectionData(q);
}
export default categoriesData;
