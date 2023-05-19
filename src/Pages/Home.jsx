import { useState, useEffect } from "react";
import "../scss/Home.scss";
import BestSellor from "../Components/RetailorCenteric/BestSellor";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retailorId } from "../actions";
import Category from "../Components/Categories/CategoryTypes";
import TopDeals from "../Components/RetailorCenteric/TopDeals";
import categoriesList from "../handles/CategoriesList";
import TopDeal from "../handles/TopDeals";
import Loader from "../Components/Loading/Loader";
export default function Home() {
  const dispatch = useDispatch();
  const { id } = useParams();
  dispatch(retailorId(id));
  const [TopDealsData = [], topDealsLoading, topDealsError] = TopDeal(id);
  const [categoryData = [], categoryLoading, categoryLoadingError] =
    categoriesList(id);
  const bestSellorData = useSelector(state=>state.rootReducer.userData.bestSellor);
  const [dataLoaded,setDataLoaded]=useState(false);
  useEffect(()=>{
    if(!topDealsLoading && !categoryLoading)
    {
      setDataLoaded(true);
    }
  },[topDealsLoading,categoryLoading])
  return (
    <>
    {
      dataLoaded?
      <div className="home_page">
        <Category
          id={id}
          categoryData={categoryData}
          categoryLoading={categoryLoading}
        />
        <TopDeals
          data={TopDealsData}
          loading={topDealsLoading}
          retailorId={id}
        />
        {
          bestSellorData?.length>0?<BestSellor data={bestSellorData}/>:<></>
        }
      </div>:<Loader/>
    }
    </>
  );
}
