import { useEffect, useState } from 'react';
import '../scss/Orders.css'
import CartOrder from '../Components/Orders/CartOrder'
import {Link} from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import createOrder from '../handles/handleOrders'
import { orderCreated, retailorId,cartData as cartItem} from '../actions';
import { TbLocationFilled } from 'react-icons/tb'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import AccountCard from '../Components/Accounts/AccountCard';
import { checkUserAuth } from '../handles/AuthUser';
import generateRandomId from '../handles/generateRandomId';
import emptyCart from '../assets/cart_empty.png'
const Orders = ({ setShowRegister }) => {
    const cartData = useSelector(state => state.rootReducer.userData.cartData);
    const userData = useSelector(state => state.rootReducer.userData.userInfo);
    const retailorData = useSelector(state => state.rootReducer.userData.retailorData);
    const isLoggedIn = useSelector(state => state.rootReducer.userData.isUserLoggedIn)
    const deleveryAddress = useSelector(state => state.rootReducer.userData.deliveryAddress);
    const [isorderCreated, setisOrderCreated] = useState(false);
    const [deliveryOption,setDeliveryOption]=useState("Home Delivery")
    const [isAddressAvilable, setIsAddressAvilable] = useState(true);
    const [savedAmount,setSavedAmount]=useState(0);
    const [isCartEmpty,setIsCartEmpty]=useState(true);
    const [note,setNote]=useState("");
    let subtotal = 0;
    cartData.map(({ quantitySold, sellingPrice,storeFrontOfferDiscount }) => subtotal += parseFloat(quantitySold * (storeFrontOfferDiscount>0?(sellingPrice-storeFrontOfferDiscount)?.toFixed(1):sellingPrice?.toFixed(1))));
    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(retailorId(id));
    const placeOrder = () => {
        let totalQuantity = 0;
        cartData.map(({ quantitySold }) => {
            totalQuantity += quantitySold;
        });
        if (isLoggedIn) {
            if ((userData.address?.length>0 && userData.zipcode?.length>0 && cartData.length !== 0 && deliveryOption === "Home Delivery") || (deliveryOption === "Store Pickup")){
                setIsAddressAvilable(true)
                const dt = new Date();
                const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
                let time = `${padL(dt.getDate())}/${padL(dt.getMonth() + 1)}/${dt.getFullYear()} ${padL(dt.getHours() > 12 ? dt.getHours() % 12 : dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())} ${padL(dt.getHours() > 12 ? "PM" : "AM")}`;
                const order = {
                    orderId: generateRandomId(),
                    orderTimeStamp: time,
                    orderTimeStampId: Date.now(),
                    finalPrice: subtotal>retailorData?.storeFront?.minDeliveryAmount?subtotal:subtotal + retailorData?.storeFront?.deliveryCharges,
                    noteForRetailor:note,
                    totalPrice: subtotal,
                    loyaltyDiscount: 0.0,
                    totalQuantity,
                    loyaltyPointEarned: 0.0,
                    loyaltyPointRedeemed: 0,
                    customer: { ...userData, address: deleveryAddress },
                    order: cartData,
                    deliveryOption,
                    orderStatus: 'New Order',
                    deliveryCharges: retailorData.storeFront.deliveryCharges
                }
                createOrder(id, order, setisOrderCreated,dispatch);
            }
            else {
                setIsAddressAvilable(false);
            }
        }
        else {
            setShowRegister(true);
        }
    }
    useEffect(()=>{
        let saved=0;
        if(cartData.length!==0)
        {
            setIsCartEmpty(false);
            cartData.map(({mrp,sellingPrice,quantitySold,storeFrontOfferDiscount})=>{
                if(mrp!=0 && mrp>=sellingPrice && storeFrontOfferDiscount>0)
                {
                    saved+=(mrp-(sellingPrice-storeFrontOfferDiscount))*quantitySold;
                }
                else if( mrp!==0 && mrp>=sellingPrice && storeFrontOfferDiscount==0)
                {
                    saved+=(mrp-sellingPrice)*quantitySold;
                }
                else if(mrp==0 && storeFrontOfferDiscount>0)
                {
                    saved+=(sellingPrice-storeFrontOfferDiscount)*quantitySold;
                    console.log(saved);
                }
                console.log("mrp: ",mrp+ " " +" sellingPrice: "+ sellingPrice+" quantitySold: "+quantitySold+" storeFrontOfferDiscount: "+storeFrontOfferDiscount);
            })
        }
        else{
            setIsCartEmpty(true)
        }
        setSavedAmount(saved)
    },[cartData])
    useEffect(() => {
        if (isorderCreated) {
            dispatch(orderCreated(true))
        }
    }, [isorderCreated])
    useEffect(() => {
        if (retailorData?.profile)
            checkUserAuth(dispatch, setShowRegister);
        }, [retailorData]);
    const handleChange = (event) => {
        setDeliveryOption(event.target.value);
    };
    return (
        <>
        {isCartEmpty?<div className='cartEmpty'>
            <div className='cartEmpty_content'>
                <img src={emptyCart} alt="none" />
                <p>Your cart is Empty</p>
            </div>
            <p>Looks Like you haven't added anything to your cart yet</p>
            <Link to={`/${id}`}><button>Continue Shopping</button></Link>
        </div>:<div className='cart'>
                <div className='address'>
                    <AccountCard id={id} icon={<TbLocationFilled size="25" />} name={userData?.address && userData?.address?.length!==0?userData?.address?.slice(0,40)+"...":"Please add your address!"} right_icon={<FaArrowAltCircleRight size="25" />} />
                    <p style={isAddressAvilable ? { display: "none" } : { color: "red", display: "flex", justifyContent: "center" }}>Address Not added</p>
                </div>
                <div className='order'>
                    <div className='order_summery'>
                        <h4 className='order_head_text'>Order Summary</h4>
                        <ul className='orders_item_list'>
                            {cartData.map(({ id, image, quantitySold, sellingPrice, name,mrp,storeFrontOfferDiscount }) => {
                            return <li><CartOrder key={id} id={id} img={image} itemQnty={quantitySold} Price={sellingPrice} productName={name} mrp={mrp} storeFrontOfferDiscount={storeFrontOfferDiscount} /></li>})}
                        </ul>
                    </div>
                    <div className='total_calculate'>
                        <ol>
                            <li className='subtotal'>
                                <span>Subtotal</span>
                                <p className='subtotal_amount'>₹{subtotal}</p>
                            </li>
                            <li className='shipping'>
                                <span>Delivery charges</span>
                                <p>₹{deliveryOption==="Store Pickup"?0:subtotal < retailorData?.storeFront?.minDeliveryAmount ? retailorData?.storeFront?.deliveryCharges : 0}</p>
                            </li>
                        </ol>
                        {deliveryOption==="Home Delivery" || savedAmount>0 ? <div className='customer_Notes'>
                            {savedAmount>0?<p className='customer_saved_amout' style={savedAmount>0?{}:{display:"none"}}>You saved ₹{savedAmount.toLocaleString().split('.').length>1?savedAmount.toFixed(1):savedAmount} So far on this order</p>:""}
                            {deliveryOption==="Home Delivery"?retailorData?.storeFront?.deliveryCharges>0?<p className='customer_delevey_Note' style={retailorData?.storeFront?.minDeliveryAmount<=subtotal ?{display:"none"}:{}}>Save ₹{retailorData?.storeFront?.deliveryCharges} on Delivery by adding ₹{retailorData?.storeFront?.minDeliveryAmount-subtotal} more to bag</p>:<></>:""}
                            </div>:""
                        }
                        <div className='order_total'>
                            <div className='delivery_options'>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Delivery Option</FormLabel>
                                    <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="controlled-radio-buttons-group"
                                    value={deliveryOption}
                                    onChange={handleChange}
                                    >
                                    <FormControlLabel value="Home Delivery" control={<Radio />} label="Home Delivery" />
                                    <FormControlLabel value="Store Pickup" control={<Radio />} label="Store Pickup" />
                                    </RadioGroup>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Note for Retailer"
                                        multiline
                                        rows={2}
                                        onChange={(e)=>setNote(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                            <div className='order_pricing'>
                                <div className='order_final_details'>
                                    <div className='total_cost_sec'>
                                        <b className='total_amount'>Rs {deliveryOption==="Store Pickup"?subtotal:subtotal + (subtotal < retailorData?.storeFront?.minDeliveryAmount ? retailorData?. storeFront?.deliveryCharges : 0)}</b>
                                    </div>
                                    <div className='saved_cost_sec'>
                                        <h5>Saved</h5>
                                        <b className='saved_amount'>₹{savedAmount>0?savedAmount.toLocaleString().split('.').length>1?savedAmount.toFixed(1):savedAmount:0}</b>
                                    </div>
                                </div>
                                <div className='addNotAdded'>
                                    <p style={isAddressAvilable ? { display: "none" } : { color: "red", display: "flex", justifyContent: "center" }}>Address Not added</p>
                                </div>
                                <button disabled={deliveryOption===""?true:false} className='Confirm_Button' onClick={placeOrder}>Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            
        </>
    );
}

export default Orders;
