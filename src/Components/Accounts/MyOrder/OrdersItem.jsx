import React from 'react'
import '../../../scss/OrdersItem.scss'
export default function OrdersItem({item}) {
  return (
    <>
        <div className="ordersItem">
            <div className='ordersItem_left'>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
            </div>
            <div className='ordersItem_right'>
                <p>Qnty: {item.orderQnty}</p>
                <p>Price: {item.orderQnty*item.sellingPrice}</p>
            </div>
        </div>
    </>
  )
}
