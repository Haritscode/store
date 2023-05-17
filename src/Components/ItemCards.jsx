import React,{useReducer, useEffect,useState,useRef} from 'react';
import '../scss/ItemCarts.scss'
import {BiPlus,BiMinus} from 'react-icons/bi';
import subtitutingImg from '../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../actions';
const initialData={
    isItemAdded:false,
    itemQuantity:0,
    operation:"",
}
const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'itemAdded':
            return {...state,isItemAdded:true,itemQuantity:1,operation:"+"}
        case "itemFoundInCart":
            return {...state,isItemAdded:true,itemQuantity:action.payload,operation:""}
        case 'quantityrm':
            if(action.payload===0)
            {
                return {...state,itemQuantity:action.payload,isItemAdded:false,operation:action.operation}
            }
            else{
                return {...state,itemQuantity:action.payload,operation:action.operation}
            }
        default:
            return state;
    }
}
const ItemCards = (info) => {
    const dispatcher=useDispatch();
    const list=useSelector(state=>state.rootReducer.userData)
    const [state,dispatch]=useReducer(reducer,initialData)
    const [discount,setDiscount]=useState(0);
    const cartItem=useSelector(state=>state.rootReducer.userData.cartData);
    const imageref=useRef(null);
    useEffect(()=>{
        cartItem?.map(item=>{
            if(item.id===info?.data?.id)
            {
                dispatch({type:"itemFoundInCart",payload:item.quantitySold})
            }
        })
    },[info])
    useEffect(()=>{
        if(info?.data?.storeFrontOfferDiscount>0 && info?.data?.mrp>0 && info?.data?.storeFrontOfferDiscount<info?.data?.mrp)
        {
            setDiscount((((info?.data?.mrp-(info?.data?.sellingPrice?.toFixed(2)-info?.data?.storeFrontOfferDiscount?.toFixed(2)))/info?.data?.mrp?.toFixed(2))*100)?.toFixed(1))
        }
        else if(info?.data?.storeFrontOfferDiscount>0 && info?.data?.mrp===0)
        {
            setDiscount(parseInt(((info?.data?.sellingPrice?.toFixed(2)-(info?.data?.sellingPrice?.toFixed(2)-info?.data?.storeFrontOfferDiscount?.toFixed(2)))/info?.data?.sellingPrice?.toFixed(2))*100)?.toFixed(1))
        }
        else if(info?.data?.sellingPrice<info?.data?.mrp)
        {
            setDiscount(parseInt(((info?.data?.mrp?.toFixed(2)-info?.data?.sellingPrice?.toFixed(2))/info?.data?.mrp)*100)?.toFixed(1))
        }
    },[info?.data?.sellingPrice,info?.data?.mrp,info?.data?.storeFrontOfferDiscount])
    useEffect(()=>{
        let data=[];
        if(state.isItemAdded && state.itemQuantity>1)
        {
            cartItem.map(lst=>{
                if(lst.id===info?.data?.id){
                    if(state.operation==="+")
                    {
                        data?.push({...lst,quantitySold:( lst.quantitySold + 1 )})
                    }
                    else if(state.operation==="-"){
                        data?.push({...lst,quantitySold:( lst.quantitySold - 1 )})
                    }
                    else{
                        data?.push({...lst})
                    }
                }
                else{
                    data?.push(lst)
                }
            })
            dispatcher(cartData(data))
        }
        else if(state.isItemAdded && state.itemQuantity===1){
            let itemAvilable=false;
            cartItem?.map(lst=>{
                if(lst.id===info?.data?.id)
                {
                    if(state.operation==="+")
                    {
                        data?.push({...lst,quantitySold:( lst.quantitySold + 1 )})
                        itemAvilable=true;
                    }
                    else if(state.operation==="-"){
                        data?.push({...lst,quantitySold:( lst.quantitySold - 1 )})                        
                        itemAvilable=true;
                    }
                    else{
                        data?.push(lst);
                        itemAvilable=true;
                    }
                }
                else{
                    data?.push(lst);
                }
            })
            if(itemAvilable)
            {
                dispatcher(cartData(data))
            }
            else{
                dispatcher(cartData([...list.cartData,{...info?.data,quantitySold:1}]))
            }
        }
        else if(state.itemQuantity===0 && state.operation==="-"){
            let newData=[];
            cartItem.map((item)=>{
                if(item.id!==info?.data?.id)
                {
                    newData.push(item);
                }
            })
            dispatcher(cartData(newData))
        }
    },[state])
    const substituteImage=()=>{
        imageref.current.src=subtitutingImg;
    }
    // console.log(info?.data?.storeFrontOfferDiscount>0?toString(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount)?.split(".")?.length>1?(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount)?.toFixed(1):(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount).toFixed(1):toString(info?.data?.sellingPrice).split(".")?.length>1?info?.data?.sellingPrice.toFixed(1):info?.data?.sellingPrice);
    return (
        <>
        <div className='Item'>
            <span className='item_discount' style={discount<=0?{display:"none"}:{display:"block"}} >{discount}% off</span>
            <img className='Item_img' src={info?.data?.image?.length!==0?info?.data?.image:subtitutingImg} alt="none" onError={substituteImage} ref={imageref}/>
            <div className='Item_body'>
                <p style={info?.data?.outOfStock?{color:"red",fontSize:'8px'}:{display:'none'}}>* Out of Stock</p>
                <div className='item_details'>
                    <h4 className='item_comp'>{info?.data?.name}</h4> 
                </div>
                <div className='add_item_sec' style={info?.data?.mrp>0 && info?.data?.mrp>info?.data?.sellingPrice?{alignItems:"center"}:{}}>
                    <div className='Item_desc'>
                        <span className='item_price'>
                            <p className='item_selling_price'>{info?.data?.storeFrontOfferDiscount>0?(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount)?.toLocaleString()?.split(".")?.length>1?(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount)?.toFixed(1):(info?.data?.sellingPrice-info?.data?.storeFrontOfferDiscount):(info?.data?.sellingPrice).toLocaleString()?.split(".")?.length>1?info?.data?.sellingPrice.toFixed(1):info?.data?.sellingPrice} ₹/{info?.data?.uom} </p>
                            <p className='item_original_price' style={info?.data?.mrp>0 && info?.data?.mrp>info?.data?.sellingPrice?{}:{display:"none"}} >{info?.data?.mrp} ₹</p>
                        </span>
                    </div>
                    {
                        !state.isItemAdded?
                        <button disabled={info?.data?.outOfStock} onClick={()=>dispatch({type:'itemAdded'})} className='Item_add_btn' >ADD</button>:<span className='item_quantity'>
                        <button onClick={()=>dispatch({type:'quantityrm',payload:state.itemQuantity-1,operation:"-"})}><BiMinus/></button>
                        <span>{state.itemQuantity}</span>
                            <button onClick={()=>dispatch({type:'quantityrm',payload:state.itemQuantity+1,operation:"+"})}><BiPlus/></button>
                        </span>
                    }
                </div>
            </div> 
        </div>   
        </>

    );
}

export default ItemCards;
