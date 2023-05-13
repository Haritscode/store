import {db} from '../firebase_setup/firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { collection, where,query } from '@firebase/firestore';
const BestSellorData=(id)=>{
    const collectionRef=collection(db,`users/${id}/soldProducts`);
    let q=query(collectionRef,where('showInStoreFront','==',true));
    return useCollectionData(q);
}
export default BestSellorData;


