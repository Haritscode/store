import { doc, setDoc } from "@firebase/firestore";
import {db} from '../firebase_setup/firebase';
import { cartData } from "../actions";
const createOrder=async(id,testData,setisOrderCreated,dispatch)=>{
    const connect=doc(db,`users/${id}/storeFrontOrders`,testData.orderId);
    try{
        const data=await setDoc(connect,testData)
        if(data?.id!=="")
        {
            setisOrderCreated(true);
            dispatch(cartData([]))
        }
    }
    catch(err){
        console.log(err);
    }
}
export default createOrder;