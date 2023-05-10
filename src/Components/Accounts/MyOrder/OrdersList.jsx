import {useState,useEffect} from 'react'
import OrderDetails from './OrderDetails'
import '../../../scss/OrdersList.scss'
import ordersList from '../../../handles/OrdersList'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export default function OrdersList() {
    const userId=useSelector(state=>state.rootReducer.userData.userId)
    const [sortedData,setSortedData]=useState([]);
    const {id}=useParams();
    const [data,loading,error]=ordersList(id,userId.slice(3)||localStorage.getItem("uid"));
    useEffect(()=>{
      if(!loading)
      {
        data.sort((a,b)=>a.orderTimeStampId<b.orderTimeStampId?1:-1)
        console.log(data);
      }
    },[loading])
    return (
    <>
    <ol className='orderList'>
    {!loading?data.map((item,count)=><OrderDetails key={count} item={item}/>):""}
    </ol>
    </>
  )
}
