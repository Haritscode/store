const retailorId=(data)=>{
    return {
        type: "RETAILORID",
        payload:{
            retailorid:data
        } 
    }
}
const retailorData=(data)=>{
    return {
        type:"RETAILORDATA",
        payload:{
            retailorData:data
        }
    }
}
const cartData=(data)=>{
    return {
        type:"CARTDATA",
        payload:{
            cartData:data
        }
    }
}
const orderCreated=(data)=>{
    return {
        type:"ISORDERCREATED",
        payload:{
            isorderCreated:data
        }        
    }
}
const deleveryAddress=(data)=>{
    return {
        type: "DELEVERYADDRESS",
        payload:{
            deliveryAddress:data
        }
    }
}
const userInfo=(data)=>{
    return {
        type:"USERDATA",
        payload:{
            userData:data
        }
    }
}
const categoryList=(data)=>{
    return {
        type:"CATEGORYLIST",
        payload:{
            categoryList:data
        }
    }
}
const isLoggedIn=(data)=>{
    return {
        type:"ISLOGGEDIN",
        payload:{
            isUserLoggedIn:data
        }
    }
}
const userId=(data)=>{
    return {
        type:"USERID",
        payload:{
            userId:data
        }
    }
}
const resendOtp=(data)=>{
    return {
        type:"RESENDOTP",
        payload:{
            resendOtp:data
        }
    }
}
const searching=(data)=>{
    return {
        type:"SEARCHING",
        payload:{
            searching:data
        }
    }
}
export { retailorId,retailorData,cartData,orderCreated,deleveryAddress,userInfo,categoryList,isLoggedIn,userId,resendOtp,searching };