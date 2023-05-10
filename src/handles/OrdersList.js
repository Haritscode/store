import { collection, where,query } from '@firebase/firestore';
import { db } from '../firebase_setup/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const ordersList=(id,phoneNumber)=>{
    if(id && phoneNumber)
    {
        const collectionRef=collection(db,`users/${id}/storeFrontOrders`)
        let q=query(collectionRef,where('customer.customerId','==',phoneNumber));
        return useCollectionData(q)
    }
    else{
        return "";
    }
    // return useCollectionData(q);
}
export default ordersList;
