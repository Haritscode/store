import {doc,setDoc,getDoc, collection, updateDoc } from '@firebase/firestore';
import {db} from '../firebase_setup/firebase';
import {isLoggedIn,userInfo} from '../actions/index'
const handleSubmit=async(id,contact,testData={},dispatcher=()=>{})=>{
    let uid=contact.slice(3)
    const readDoc=doc(db,`users/${id}/customer/${uid}`);
    const writeDoc=doc(db,`users/${id}/customer`,uid);
    try{
        const data=await getDoc(readDoc);
        if(data.exists())
        {
            let result=data.data();
            if(result.address)
            {
                dispatcher(userInfo(data.data()))
            }
            else{
                let res=await updateDoc(readDoc,{isLoyaltyCustomer:false,netLoyaltyPoints:0,isStoreFrontCostomer:false,address:"",city:"",state:"",zipcode:"",customerName:"",customerId:uid})
                dispatcher(userInfo({...data.data(),address:"",city:"",state:"",zipcode:"",customerName:"",customerId:uid}))
            }
            localStorage.setItem("uid",uid)
            dispatcher(isLoggedIn(true))
        }
        else if(testData.customerMobile){
            let data=await setDoc(writeDoc,{...testData,isLoyaltyCustomer:false,netLoyaltyPoints:0,isStoreFrontCostomer:false,address:"",city:"",state:"",zipcode:"",customerName:"",customerId:uid})
            dispatcher(userInfo({...testData,isLoyaltyCustomer:false,netLoyaltyPoints:0,isStoreFrontCostomer:false,address:"",city:"",state:"",zipcode:"",customerName:"",customerId:uid}))
            localStorage.setItem("uid",uid)
            dispatcher(isLoggedIn(true))
        }
        else{
            return;
        }
        
    }
    catch(err){
        console.log(err);
    }
}
export default handleSubmit;    