import { getDoc,doc } from "@firebase/firestore";
import { db } from "../firebase_setup/firebase"
const orderDetail=async(retailorId,orderId,setOrderData)=>{
    const readDoc=doc(db,`users/${retailorId}/storeFrontOrders/${orderId}`);
    try{
        const data=await getDoc(readDoc)
        if(data.exists())
        {
            let itemList=data.data();
            if(itemList)
            {
                let content=await data.data()
                setOrderData(content);
            }
        }
    }
    catch(err){
        console.log(err);
        return;
    }
}
export default orderDetail;