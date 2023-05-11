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
import BestSellorData from "../handles/BestSellorsData";
import Loader from "../Components/Loading/Loader";
export default function Home() {
  const dispatch = useDispatch();
  const { id } = useParams();
  dispatch(retailorId(id));
  const [TopDealsData = [], topDealsLoading, topDealsError] = TopDeal(id);
  const [categoryData = [], categoryLoading, categoryLoadingError] =
    categoriesList(id);
  const [bestSellorData = [], bestSellorloading, bestSellorLoadingerror] =
    BestSellorData(id);
  const [dataLoaded,setDataLoaded]=useState(false);
  useEffect(()=>{
    if(!topDealsLoading && !categoryLoading && !bestSellorloading)
    {
      setDataLoaded(true);
    }
  },[topDealsLoading,categoryLoading,bestSellorloading])
  console.log(topDealsLoading + " "+ categoryLoading + " " + bestSellorloading );
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
        <BestSellor data={bestSellorData} id={id} loading={bestSellorloading} />
      </div>:<Loader/>
    }
    </>
  );
}
