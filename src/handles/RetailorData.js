import { getDoc,doc } from "@firebase/firestore";
import { db } from "../firebase_setup/firebase"
import { retailorData } from "../actions";
const retailorInfo=async(rid,dispatch)=>{
    console.log(rid);
    const readDoc=doc(db,`users/${rid}`);
    try{
        const data=await getDoc(readDoc)
        if(data.exists())
        {
            let itemList=data.data();
            if(itemList)
            {
                dispatch(retailorData(data.data()))
            }
        }
    }
    catch(err){
        console.log(err);
    }
}
export default retailorInfo;