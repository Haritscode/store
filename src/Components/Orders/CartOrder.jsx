import { useEffect,useState } from 'react';
import '../../scss/CardOrder.scss'
import {BiPlus,BiMinus} from 'react-icons/bi';
import blkimage from '../../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../../actions';
const CartOrder = ({id,img,itemQnty,Price=0,productName,mrp=0}) => {
  const data=useSelector(state=>state.rootReducer.userData.cartData)  
  console.log(data);
  const dispatch=useDispatch();
  const [discount,setDiscount]=useState(0);
  useEffect(()=>{
    if(Price <= mrp)
    {
        setDiscount(parseInt(((mrp-Price)/mrp)*100))
    }
  })
  useEffect(()=>{
    let orderData=JSON.stringify(data)
    localStorage.setItem("cartData",orderData);
  },[data])
  const subQnty=(id)=>{
    let items=data.cartData;
    let newData=[]
    items.map((item)=>{
      if(item.id===id && item.orderQnty!==1)
      {
          newData.push({...item,orderQnty:item.orderQnty-1})
      }
      else if(item.id===id && item.orderQnty===1){}
      else{
        newData.push({...item})
      }
    })
    dispatch(cartData(newData))
  }
  const addQnty=(id)=>{
    let items=data.cartData;
    let newData=[]
    items.map((item)=>{
      if(item.id==id)
      {
        newData.push({...item,orderQnty:item.orderQnty+1})
      }
      else{
        newData.push({...item})
      }
    })
    dispatch(cartData(newData))
  }
    return (
        <>
          {/* <div className='Cardorder'>
            <img src={img.length===0?blkimage:img} alt="none" className='order_img'/>
            <div className='order_item_desc'>
                <h5 className='order_item_name'>{productName}</h5>
                <p className='order_item_company'>{productBrand}</p>
                <h5>₹{Price}</h5>
            </div>
            <span className='order_item_quantity'>
                <button onClick={()=>subQnty(id)}><BiMinus/></button>
                <span>{itemQnty}</span>
                <button onClick={()=>addQnty(id)}><BiPlus/></button>
            </span>
          </div> */}
          <div className='cartOrder'>
              <img src={img.length===0?blkimage:img} alt="none" className='order_img'/>
              <div className='cartOrder_right'>
                <p>{productName.length<20?productName:productName.slice(0,15)+"..."}</p>
                <div className='cartitem_price'>
                  <p className='offer_price'>₹{Price}</p>
                  <p className='orignal_price' style={mrp-Price<=0?{display:"none"}:{}}>₹{mrp}</p>
                  <span className='Discount' style={mrp-Price<=0?{display:"none"}:{}}>({`${discount}% off`})</span>
                </div>
                <p className='cartOrder_saved_amount' style={mrp-Price<=0?{display:"none"}:{}}>
                  You Save ₹{mrp-Price} 
                </p>
              <span className='order_item_quantity'>
                <button onClick={()=>subQnty(id)}><BiMinus/></button>
                <span>{itemQnty}</span>
                <button onClick={()=>addQnty(id)}><BiPlus/></button>
              </span>
              </div>
          </div>
        </>
    );
}

export default CartOrder;