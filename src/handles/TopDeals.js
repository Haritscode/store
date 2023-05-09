import { collection, where,query } from '@firebase/firestore';
import { db } from '../firebase_setup/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const TopDeal=(id)=>{
    const collectionRef=collection(db,`users/${id}/inventory`)
    let q=query(collectionRef,where('storeFrontOfferDiscount','!=',0));
    return useCollectionData(q);
}
export default TopDeal;