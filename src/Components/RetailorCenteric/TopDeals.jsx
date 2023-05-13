import {useEffect,useState} from 'react';
import '../../scss/TopDeal.scss'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import axios from 'axios';
import ItemCards from '../ItemCards';
const TopDeals = ({data,loading}) => {
    const [Date,setDate]=useState("")
    const [TodaysDate,setTodaysDate]=useState("");
    const [topDealsData,setTopDealsData]=useState([]);
    useEffect(()=>async()=>{
        let Date=await axios.get('http://worldtimeapi.org/api/timezone/Asia/kolkata')
        setDate(Date?.data?.datetime);
    },[]);
    useEffect(()=>{
        if(Date!==""){
            let year=Date?.slice(0,4);
            let month=Date?.slice(5,7);
            let date=Date?.slice(8,10);
            setTodaysDate(`${date}/${month}/${year}`)
        }
    },[Date]);
    useEffect(()=>{
        const TopDealsData=[];
        if(data.length!==0 && TodaysDate!==""){
            data.map(itm=>{
                let validityDate=itm.storeFrontOfferValidity.slice(0,2);
                let validityMonth=itm.storeFrontOfferValidity.slice(3,5);
                let validityYear=itm.storeFrontOfferValidity.slice(6,10);
                if(parseInt(validityYear)===parseInt(TodaysDate?.slice(6,10))){
                    if(parseInt(validityMonth)>=parseInt(TodaysDate?.slice(3,5))){
                        if(parseInt(validityDate)>=parseInt(TodaysDate?.slice(0,2))){
                            TopDealsData.push(itm);
                        }
                    }
                }
                else if(parseInt(validityYear)>parseInt(TodaysDate?.slice(6,10)))
                {
                    TopDealsData.push(itm)
                }
            }
            )
        }
        setTopDealsData(TopDealsData);
    },[TodaysDate,loading])
    return (
        <>
            {topDealsData.length>0?<div className='Top_deals'>
                <div className='Top_Deals_head'>
                    <h1>
                        Top Deals
                    </h1>
                </div>
                <ScrollMenu scrollContainerClassName={"scroller"}>
                    {
                        topDealsData.map((info,count) => <ItemCards key={count} data={info}  />)
                    }
                </ScrollMenu>
            </div>:""}
        </>
    );
}

export default TopDeals;