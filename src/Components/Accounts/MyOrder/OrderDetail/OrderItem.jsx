import React, { useRef } from 'react';
import image from '../../../../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg'
import '../../../../scss/orderItem.scss'
export default function OrderItem() {
  const imageRef=useRef(null);
  const handleError=()=>{
    imageRef.current.src=image;
  }
  return (
    <>
        <div className='my_orders_order_card'>
            <img src="/OIP.jpeg" alt="none" className='my_orders_img' onError={handleError} ref={imageRef}/>
            <div className='order_item_desc'>
              <span className='order_info'>
                <p className='order_item_name'>Panchakki Aata</p>
                <p className='order_item_price'>1 &#10005; ₹210</p>
              </span>
              <span>
                <p>₹210</p>
              </span>
            </div>
        </div>
    </>
  )
}
