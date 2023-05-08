import {doc,setDoc,getDoc, collection, updateDoc } from '@firebase/firestore';
import {db} from '../firebase_setup/firebase';
// const connect=collection(db,'storefront', 'tjy');
const AddAddress=async(id,contact,state,dispatch)=>{
    let ids=contact.slice(3)
    const readDoc=doc(db,`users/${id}/customer/${ids}`);
    const writeDoc=doc(db,`users/${id}/customer`,ids);
    try{
        const data=await getDoc(readDoc);
        let res=""
        if(data.exists())
        {
            try{
                
                res=await updateDoc(readDoc,state)
                localStorage.setItem("uid",ids)
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }
    catch(err){
        console.log(err);
    }
}
export default AddAddress;    