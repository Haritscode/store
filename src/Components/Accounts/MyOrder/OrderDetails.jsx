import React from 'react'
import '../../../scss/OrderDetails.scss'
import {useSelector} from 'react-redux'
export default function OrderDetails({item}) {
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData);
  return (
        <>
        <li>
      <div className='ordersDetail'>
        <div className="order_detail">
          <div className='order_qnty'>
            <p className='order_id'>OrderId: {item.orderId.slice(0,8)}...</p>
            <b>₹{item.finalPrice}</b>
          </div>
          <div className='order_placed_info'>
            <p>{item.order.length} items</p>
            <p>{item.orderTimeStamp.slice(0,16)} {item.orderTimeStamp.slice(20,23)}</p>
          </div>
        </div>
        <p className='order_status'>&#9679; {item.orderStatus}</p>
      </div>
      </li>
        </>
      )
    }
    