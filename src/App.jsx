import { useState,useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import Inventory from './Pages/Inventory'
import Orders from './Pages/Orders'
import OrdersConfirmed from './Components/Orders/OrdersConfirmed'
import Account from './Components/Accounts/Account'
import MobileLogin from './Components/Mobile_Login_Register/MobileLogin'
import SearchItems from './Components/SearchItems'
import { checkUserAuth } from './handles/AuthUser'
import DisablePage from './Pages/DisablePage'
import retailorInfo from './handles/RetailorData'
import { cartData } from './actions'
import { orderCreated } from './actions'
function App() {
  const isOrderCreated=useSelector(state=>state.rootReducer.userData.isOrderCreated);
  const isUserLoggedIn=useSelector(state=>state.rootReducer.userData.isUserLoggedIn);
  const categoryList=useSelector(state=>state.rootReducer.userData.categoryList);
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData);
  const [showRegister,setShowRegister]=useState(false);
  const [isSearchFocus,setIsSearchFocus]=useState(false);
  const [search, setSearch] = useState("");
  const dispatch=useDispatch();
  let id=location.pathname.split("/")[1];
  const [suggestion, setSuggestion] = useState([]);
  useEffect(()=>{
    let ordersData=localStorage.getItem(id);
    ordersData=JSON.parse(ordersData);
    retailorInfo(id,dispatch)
    if(ordersData!==null)
    {
      dispatch(cartData(ordersData))
    }
  },[])
  useEffect(()=>{
    checkUserAuth(dispatch);
  },[categoryList]);
  useEffect(()=>{
    if(retailorData?.store?.storeName?.length>0)
    {
      document.title=retailorData?.store?.storeName
    }
  },[retailorData])
  useEffect(()=>{
    if(isOrderCreated)
    {
      setTimeout(()=>{
        dispatch(orderCreated(false))
      },2000)
    }
  },[isOrderCreated])
  return (
    <div className="App">
      {
      retailorData.number===undefined?true:retailorData?.storeFront?.storeFrontActive?
        <>
        <Navbar setShowRegister={setShowRegister} showRegister={showRegister} setSearch={setSearch} search={search} setSuggestion={setSuggestion} suggestion={suggestion} setIsSearchFocus={setIsSearchFocus} isSearchFocus={isSearchFocus}/>
          <Routes>
            <Route path="/:id" element={<Home/>}></Route>
.           <Route path="/:id/category/:categoryName" element={<Inventory/>}></Route>
            <Route path="/:id/orders" element={!isOrderCreated?<Orders setShowRegister={setShowRegister}/>:<OrdersConfirmed/>}/>
            <Route path="/:id/account" element={<Account/>}/>
            <Route path="/:id/search" element={<SearchItems suggestion={suggestion} setIsSearchFocus={setIsSearchFocus} id={id}/>}/>
            {/* <Route path="/:id/login" element={<Login/>}/>
            <Route path="/:id/register" element={<Register/>}/> */}
            </Routes>
            {showRegister?!isUserLoggedIn?<MobileLogin setShowRegister={setShowRegister}/>:"":""}
        </>:<DisablePage retailorData={retailorData}/>
      }
    </div>
  )
}

export default App
