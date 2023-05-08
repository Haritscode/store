import React from 'react'
import '../../../scss/orderDetail.scss'
export default function OrderDetail({item}) {
  return (
    <>
    <div className='orderDetail'>
       <p className='orderDetail_Date'>{item.orderTimeStamp.slice(0,10)}</p>
       <p className='order_status' style={item.orderStatus==="New Order"?{color:""}:item.orderStatus==="Order Accepted"?{color:"yellow"}:item.orderStatus==="Order Rejected"?{color:"red"}:item.orderStatus==="Delevered"?{color:"Green"}:{}}>{item.orderStatus}</p>
    </div>
    </>
  )
}
