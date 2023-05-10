import { doc, setDoc } from "@firebase/firestore";
import {db} from '../firebase_setup/firebase';
const createOrder=async(id,testData,setisOrderCreated)=>{
    const connect=doc(db,`users/${id}/storeFrontOrders`,testData.orderId);
    try{
        const data=await setDoc(connect,testData)
        if(data?.id!=="")
        {
            setisOrderCreated(true);
        }
    }
    catch(err){
        console.log(err);
    }
}
export default createOrder;