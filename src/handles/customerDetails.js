import { getDoc,doc } from "@firebase/firestore";
import { db } from "../firebase_setup/firebase"
const customerDetails=async(rid,cid,setUserData)=>{
    const readDoc=doc(db,`users/${rid}/customer/${cid.slice(3)}`);
    try{
        const data=await getDoc(readDoc)
        if(data.exists())
        {
            let itemList=data.data();
            if(itemList)
            {
                setUserData(data.data());
            }
        }
    }
    catch(err){
        console.log(err);
    }
}
export default customerDetails;