import React, { useRef } from 'react';
import image from '../../../../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg'
import '../../../../scss/orderItem.scss'
export default function OrderItem({data}) {
  const imageRef=useRef(null);
  const handleError=()=>{
    imageRef.current.src=image;
  }
  return (
    <>
        <div className='my_orders_order_card'>
            <img src={data?.image} alt="none" className='my_orders_img' onError={handleError} ref={imageRef}/>
            <div className='order_item_desc'>
              <span className='order_info'>
                <p className='order_item_name'>{data?.name}</p>
                <p className='order_item_price'>{data?.orderQnty} &#10005; ₹{data?.storeFrontOfferDiscount>0?(data.sellingPrice-data?.storeFrontOfferDiscount).toFixed(1):data?.sellingPrice.toFixed(1)}</p>
              </span>
              <span>
                <p>₹{data?.orderQnty*(data?.storeFrontOfferDiscount>0?(data.sellingPrice-data?.storeFrontOfferDiscount).toFixed(1):data?.sellingPrice.toFixed(1))}</p>
              </span>
            </div>
        </div>
    </>
  )
}
