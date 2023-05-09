const initialState={
    retailorId:"",
    retailorData:{},
    cartData:[],
    isOrderCreated:false,
    deliveryAddress:"",
    categoryList:[],
    isUserLoggedIn:false,
    userInfo:[],
    userId:"",
    resendOtp:false,
    searching:""
}
const userData=(state=initialState,action)=>{
    switch(action.type)
    {
        case "RETAILORID":
            return {...state,retailorId:action.payload.retailorid};
        case "RETAILORDATA":
            return {...state,retailorData:action.payload.retailorData}
        case "CARTDATA":
            return {...state,cartData:action.payload.cartData};
        case "ISORDERCREATED":
            return {...state,isOrderCreated:action.payload.isorderCreated}
        case "DELEVERYADDRESS":
            return {...state,deliveryAddress:action.payload.deliveryAddress}
        case "USERDATA":
            return {...state,userInfo:action.payload.userData}
        case 'CATEGORYLIST':
            return {...state,categoryList:action.payload.categoryList}
        case 'ISLOGGEDIN':
            return {...state,isUserLoggedIn:action.payload.isUserLoggedIn}
        case "USERID":
            return {...state,userId:action.payload.userId}
        case 'RESENDOTP':
            return {...state,resendOtp:action.payload.resendOtp}
        case "SEARCHING":
            return {...state,searching:action.payload.searching}
        default:
            return state;
    }
}
export default userData;