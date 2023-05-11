import {useState} from 'react'
import ItemCards from '../ItemCards'
import "../../scss/BestSellor.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export default function BestSellor({data,loading,id}) {
  const [NoOfItemToShow,setNoOfItemToShow]=useState(6)
  return (
    <>
    <div className='Top_pickup'>
      <div className='Top_pickup_head'>
        <h3 className="topdealsheading">Our Best Sellers</h3>
      </div>
      <ol className="Top_Pickup_List">
        {data.map((item,count)=>count<NoOfItemToShow?<ItemCards key={count} data={item}/>:"")}
      </ol>
        <button className='show_btns' style={data.length<6?{display:"none"}:{}} onClick={()=>data.length<=NoOfItemToShow?setNoOfItemToShow(6):setNoOfItemToShow(NoOfItemToShow+NoOfItemToShow)}>
          {data.length<=NoOfItemToShow?
            <div className='best_seller_btns_content'>
              <p>Show few Items</p>
              <KeyboardArrowUpIcon/>
            </div>:
            <div className='best_seller_btns_content'>
              <p>Show More Items</p>
              <KeyboardArrowDownIcon/>
            </div>
          }</button>
    </div>
    </>
  )
}
