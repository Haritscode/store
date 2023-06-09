import {useState,useEffect, useRef} from "react";
import "../../../../scss/myOrdersDetail.scss";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OrderItem from "./OrderItem";
import { useLocation, useNavigate } from "react-router-dom";
import orderDetail from "../../../../handles/orderDetail";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import dateFormat, { masks } from "dateformat";
import image from "../../../../assets/e-commerce-shopping-cart-side-view-727680.jpg"
export default function OrderDetail() {
  const location=useLocation();
  const orderId=location.state.orderId;
  const [orderData,setOrderData]=useState({});
  const [orderDate,setOrderDate]=useState("");
  const retailorId=useSelector(state=>state.rootReducer.userData.retailorId);
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData);
  const navigate=useNavigate();
  const imageRef=useRef(null);
  useEffect(()=>{
    if(orderId.length>0)
    {
      orderDetail(retailorId,orderId,setOrderData);
    }
  },[orderId])
  useEffect(()=>{
    if(orderData?.orderTimeStamp?.length>0)
    {
      const dateString = orderData?.orderTimeStamp?.slice(0,19);
      const [day, month, year, hours, minutes, seconds] = dateString.split(/[/ :]/);
      const date = new Date(year, month - 1, day, hours, minutes, seconds);
      let newDate=dateFormat(date,"DDDD");
      if(newDate==='Today' || newDate==='YesterDay')
      {
        setOrderDate(newDate +" "+ orderData?.orderTimeStamp?.slice(10,16)+ " "+orderData.orderTimeStamp?.slice(20))
      }
      else{
        setOrderDate(orderData?.orderTimeStamp?.slice(0,16)+" "+orderData?.orderTimeStamp?.slice(20))
      }
    }
  },[orderData])
  const defaultImage=()=>{
    imageRef.current.src=image
  }
  return (
    <>
      <div className="myorders_order_page">
        <div className="myorders_order_body">
          <button onClick={()=>navigate(-1)} className="myorders_back_btn"><KeyboardBackspaceIcon/> Go Back</button>
          <div className="myorders_order_info">
            <img src={retailorData?.store?.storeImage} alt="none" className="myorders_shop_logo" onError={defaultImage} ref={imageRef}/>
            <div className="myorders_order_detail">
              <p className="myorders_store_Name">{retailorData?.store?.storeName}</p>
              <p className="myorders_order_at">
                {`${orderData?.orderTimeStamp} | ${orderData?.order?.length} Items | ₹${orderData?.totalPrice}`}
              </p>
            </div>
          </div>
          <hr />
          <div className="myorders_order_status">
            <WarningAmberIcon sx={{color:"red",fontSize:"4rem",fontWeight:100}} />
            <div>
                <p className="myorders_order_status_info">{orderData?.orderStatus}</p>
                <p className="myorders_latest_order_status_update">{orderDate}</p>
            </div>
          </div>
          <hr />
          <div className="myorders_order_Items">
            <p className="myorders_order_Items_qnty">{orderData?.order?.length} Items</p>
            <ul className="myorders_order_list">
              {
                orderData?.order?.map((item,count)=><li className="myorders_order_list_item" key={count}><OrderItem data={item}/></li>)
              }
            </ul>
          </div>
          <hr />
          <div className="myorders_order_cost">
            <div className="myorders_order_total">
              <p className="myorders_order_total_text">Item Total</p>
              <p className="myorders_order_total_price">₹{orderData?.totalPrice}</p>
            </div>
            <div className="myorders_order_total">
              <p className="myorders_order_total_text"><i>Order Type</i></p>
              <p className="myorders_order_total_price"><i>{orderData?.deliveryOption}</i></p>
            </div>
            {orderData?.deliveryOption==="Home Delivery" && retailorData?.storeFront?.minDeliveryAmount>orderData.totalPrice?<div className="myorders_order_total">
              <p className="myorders_order_total_text"><b><i>Delivery Charges</i></b></p>
              <p className="myorders_order_total_price">₹<b><i>{orderData?.deliveryCharges}</i></b></p>
            </div>:<></>}
            <div className="myorders_order_grand_total">
              <p className="myorders_order_grand_total_text">Grand Total</p>
              <p className="myorders_order_grand_price">₹{orderData?.finalPrice}</p>
            </div>
            {
              orderData?.noteForRetailor?.length>0?<div className="myorders_custom_message">
              <p><b>Note: </b> {orderData?.noteForRetailor}</p>
            </div>:<></>
            }
          </div>
        </div>
      </div>
    </>
  );
}
