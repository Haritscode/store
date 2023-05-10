import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../../scss/OrderDetails.scss'
import images from '../../../assets/e-commerce-shopping-cart-side-view-727680.jpg'
import OrderDetail from './OrderDetail';
import OrdersItem from './OrdersItem';
import {useSelector} from 'react-redux'
export default function OrderDetails({item}) {
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData);
  return (
        <>
        <li>
        {/* <Accordion style={{backgroundColor:"#f0f2f5",listStyle:"none"}}>
        <AccordionSummary
          expandIcon={""}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{width:"100%"}}>
            {<OrderDetail item={item}/>}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{display:"flex",flexDirection:"column",gap:"1rem",border:"1px solid gray"}}>
            {item.order.map((item,count)=><Typography key={count} style={{width:"100%"}}>
                <OrdersItem item={item}/>
              </Typography>)}
        </AccordionDetails>
      </Accordion> */}
      <div className='ordersDetail'>
        {/* <div className="retailorDetails">
          <img className="storeImg" src={retailorData?.store?.storeImage.length!==0?retailorData?.store?.storeImage.length:images} alt="" />
          <p className='storeName'>{retailorData?.store.storeName}</p>
        </div> */}
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
    