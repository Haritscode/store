import React from 'react'
import '../../scss/AccountCard.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderList from './MyOrder/OrdersList';
import LoyalityPoints from './LoyalityPoints/LoyalityPoints';
import UserAddress from './Addresses/UserAddress';
import { useSelector } from 'react-redux';
export default function AccountCard({icon,name,right_icon,id}) {
  const userData=useSelector(state=>state.rootReducer.userData.userInfo);
  return (
    <>
    <li className='Accoutcard'>
    <Accordion style={{backgroundColor:"#f0f2f5",border:"none",width:'100vw',justifyContent:"center",alignItems:"center",alignContent:"center"}}>
        <AccordionSummary
          expandIcon={right_icon!==""?<ExpandMoreIcon />:""}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><div className="AccountCard_left">
            {icon}
            <span>{name}</span>
        </div></Typography>
        </AccordionSummary>
        <AccordionDetails className='acc_cards'>
          <Typography>
            {name==="MyOrders"?<OrderList/>:name==="My Loyality Points"?<LoyalityPoints/>:name==="My Addresses"?<UserAddress />:name===userData?.address?.slice(0,40)+"..."?<UserAddress />:name==="Please add your address!"?<UserAddress />:""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </li>
    </>
  )
}
