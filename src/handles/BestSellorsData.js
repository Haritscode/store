import {db} from '../firebase_setup/firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { collection } from '@firebase/firestore';
const BestSellorData=(id)=>{
    const query=collection(db,`users/${id}/soldProducts`)
    return useCollectionData(query);
}
export default BestSellorData;