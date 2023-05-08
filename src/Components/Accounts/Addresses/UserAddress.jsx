import {useEffect, useReducer, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleveryAddress, userInfo } from '../../../actions'
import AddAddress from '../../../handles/AddAddress'
import customerDetails from '../../../handles/customerDetails'
import '../../../scss/UserAddress.scss'
import DialogCard from './DialogCard'
const initalState={
  address:"",
  city:"",
  state:"Uttarakhand",
  zipcode:""
}
export default function UserAddress() {
  const reducer=(state,action)=>{
    switch (action.type)
    {
      case "ADDRESS":
        return {...state,address:action.payload}
      case "CITY":
        return {...state,city:action.payload}
      case "STATE":
        return {...state,state:action.payload}
      case "ZIPCODE":
        return {...state,zipcode:action.payload}
    }
  }
  const [state,dispatcher]=useReducer(reducer,initalState)
  const userData=useSelector(state=>state.rootReducer.userData.userInfo)
  const [userdata,setUserData]=useState({})
  const {id}=useParams();
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const addAddress=()=>{
    if(state.address!="" && state.zipcode!=="")
    {
      AddAddress(id,userData.customerMobile,state);
      dispatch(userInfo({...userData,...state}))
      handleClose();
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    if(userData?.address)
    {
      if(userData?.address!="" && userData?.zipcode!="")
      {
        dispatch(deleveryAddress(`${userData.address+","+userData.city+","+userData.zipcode+","+userData.state}`))
        dispatcher({type:"ADDRESS",payload:userData.address})
        dispatcher({type:"CITY",payload:userData.city})
        dispatcher({type:"STATE",payload:userData.state})
        dispatcher({type:"ZIPCODE",payload:userData.zipcode})
      }
    }
    },[userData])
    return (
    <>
        <form className='addresses' onSubmit={e=>e.preventDefault()}>
            <h1 className='add_head_text'> Your Address</h1>
            <ol className='address'>
                <li>
                  {/* <input type="radio" id={item+count} defaultChecked={count===0?true:""} onChange={selected} name="age" value={item}/> */}
                  {state?.address?<label htmlFor={state.address}>{state.address+","+state.city+","+state.zipcode+","+state.state}</label>:""}
                </li>
            </ol>
            <DialogCard open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} dispatch={dispatcher} addAddress={addAddress} state={state}/>
            <button onClick={handleClickOpen}>{state?.address==""?"Add Address":"Edit Address"}</button>
        </form>
    </>
    )
}

