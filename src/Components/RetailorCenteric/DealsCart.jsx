import React,{useReducer, useEffect,useState} from 'react';
import {BiPlus,BiMinus} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../../actions';
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
    const [isItemFount,setIsItemFound]=useState(false);
    var discount=0;
    if(info.data.sellingPrice <= info.data.mrp)
    {
        discount=parseInt(((info.data.mrp-info.data.sellingPrice)/info.data.mrp)*100)
    }
    useEffect(()=>{
        let data=[];
        if(state.isItemAdded && state.itemQuantity>1)
        {
            list.cartData.map((lst)=>{
                if(lst.id===info.data.id){
                    if(state.operation==="+")
                    {
                        data.push({...lst,orderQnty:( lst.orderQnty + 1 )})
                    }
                    else{
                        data.push({...lst,orderQnty:( lst.orderQnty - 1 )})
                    }
                }
                else{
                    data.push(lst)
                }
            })
            dispatcher(cartData(data))
        }
        else if(state.isItemAdded && state.itemQuantity==1){
            let itemAvilable=false;
            list.cartData.map((lst)=>{
                if(lst.id===info.data.id)
                {
                    if(state.operation==="+")
                    {
                        data.push({...lst,orderQnty:( lst.orderQnty+1 )})
                        itemAvilable=true;
                    }
                    else{
                        data.push({...lst,orderQnty:( lst.orderQnty-2 )})                        
                        itemAvilable=true;
                    }
                }
                else{
                    data.push(lst);
                }
            })
            if(itemAvilable)
            {
                dispatcher(cartData(data))
            }
            else{
                dispatcher(cartData([...list.cartData,{...info.data,orderQnty:1}]))
            }
        }
    },[state])
    return (
        <>
        <div className='Item'>
            <span className='item_discount' style={discount<=0?{display:"none"}:{display:"block"}} >{discount}% off</span>
            <img className='Item_img' src={info.data.image} alt="none"/>
            <div className='Item_body'>
                <div className='item_details'>
                    <h4 className='item_comp'>{info.data.name}</h4> 
                    {/* <p className='item_name'>{info.data.name}</p> */}
                </div>
                <div className='add_item_sec'>
                    <div className='Item_desc'>
                        <p className='item_qnty'>{info.data.quantityInStock}</p>
                        <span className='item_price'>
                            <p className='item_selling_price'>{info.data.storeFrontOfferDiscount} ₹/{info.data.uom} </p>
                            <p className='item_original_price' >{info.data.sellingPrice} ₹</p>
                        </span>
                    </div>
                    {
                        !state.isItemAdded?
                        <button onClick={()=>dispatch({type:'itemAdded'})} className='Item_add_btn' >ADD</button>:<span className='item_quantity'>
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
