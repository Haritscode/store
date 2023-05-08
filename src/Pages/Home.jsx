import "../scss/Home.scss"
import Promotion from '../Components/Promotion/Promotion'
import BestSellor from '../Components/RetailorCenteric/BestSellor'
import { useParams } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { retailorId } from "../actions";
import Category from '../Components/Categories/CategoryTypes'
import TopDeals from "../Components/RetailorCenteric/TopDeals";
export default function Home() {
    const dispatch=useDispatch();
    const {id}=useParams();
    dispatch(retailorId(id))
  return (
    <>
    <div className='home_page'>
      <Category/>
      <TopDeals/>
      <BestSellor/>
    </div>
    </>
  )
}
