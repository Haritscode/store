import {useEffect} from "react";
import '../../scss/OrdersConfirmed.scss'
import img from '../../assets/Completed.gif'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartData, orderCreated } from '../../actions/index'
function OrderConfirmend({ setOpenModal }) {
  const {id}=useParams()
  const navigate=useNavigate();
  const isOrderCreated= useSelector(state=>state.rootReducer.userData.isOrderCreated);
  const dispatch=useDispatch()
  useEffect(()=>{
    console.log(isOrderCreated);
    if(isOrderCreated)
    {
      setTimeout(()=>{
        dispatch(orderCreated(false))
        dispatch(cartData([]));
        navigate(`/${id}`)
      },500000)
    }
  },[isOrderCreated])
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1 className="conf_ord_txt">Your order has been confirmed!</h1>
        </div>
        <div className="conf-img">
          <img className='conf_ord_img' src={img} alt="confirmation gif"></img>
        </div>
        <div className="body">
          <p className="conf_ord_txt_2">Hope you enjoyed shopping with us.</p>
        </div>
        <div className="footer">
          <Link to={`/${id}`}>
          <button
            id="cancelBtn"
          >
            HOME
          </button>
          </Link>
          {/* <button>ORDERS</button> */}
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmend;