import {useState,useEffect} from "react";
import "../../../../scss/myOrdersDetail.scss";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OrderItem from "./OrderItem";
import { useLocation } from "react-router-dom";
import orderDetail from "../../../../handles/orderDetail";
import { useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";
export default function OrderDetail() {
  const location=useLocation();
  const orderId=location.state.orderId;
  const [orderData,setOrderData]=useState({});
  const retailorId=useSelector(state=>state.rootReducer.userData.retailorId)
  useEffect(()=>{
    if(orderId.length>0)
    {
      orderDetail(retailorId,orderId,setOrderData);
    }
  },[orderId])
  return (
    <>
      <div className="myorders_order_page">
        <div className="myorders_order_body">
          <div className="myorders_order_info">
            <img src="/Beazy-Logo-image.svg" alt="none" className="myorders_shop_logo" />
            <div className="myorders_order_detail">
              <p className="myorders_store_Name">Store Name</p>
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
                <p className="myorders_latest_order_status_update">{dateFormat(orderData?.orderTimeStamp)} ,{orderData?.orderTimeStamp?.slice(20)}</p>
            </div>
          </div>
          <hr />
          <div className="myorders_order_Items">
            <p className="myorders_order_Items_qnty">2 Items</p>
            <ul className="myorders_order_list">
              <li className="myorders_order_list_item"><OrderItem/></li>
              <li className="myorders_order_list_item"><OrderItem/></li>
              <li className="myorders_order_list_item"><OrderItem/></li>
              <li className="myorders_order_list_item"><OrderItem/></li>
              <li className="myorders_order_list_item"><OrderItem/></li>
            </ul>
          </div>
          <hr />
          <div className="myorders_order_cost">
            <div className="myorders_order_total">
              <p className="myorders_order_total_text">Item Total</p>
              <p className="myorders_order_total_price">₹269</p>
            </div>
            <div className="myorders_order_total">
              <p className="myorders_order_total_text">Delivery Charges</p>
              <p className="myorders_order_total_price">₹40</p>
            </div>
            <div className="myorders_order_grand_total">
              <p className="myorders_order_grand_total_text">Grand Total</p>
              <p className="myorders_order_grand_price">₹309</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
