import OrderDetails from './OrderDetails'
import '../../../scss/OrdersList.scss'
import ordersList from '../../../handles/OrdersList'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export default function OrdersList() {
    const userId=useSelector(state=>state.rootReducer.userData.userId)
    const {id}=useParams();
    const [data,loading,error]=ordersList(id,userId.slice(3)||localStorage.getItem("uid"));
    return (
    <>
    <ol className='orderList'>
    {!loading?data.map((item,count)=><OrderDetails key={count} item={item}/>):""}
    </ol>
    </>
  )
}
