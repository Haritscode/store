import React,{useEffect} from 'react'
import ItemCards from './ItemCards'
import '../scss/SearchItems.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function SearchItems({suggestion,setIsSearchFocus,id}) {
  const navigate=useNavigate();
  const searching=useSelector(state=>state.rootReducer.userData.searching);
  useEffect(()=>{
    if(suggestion.length===0)
    {
      navigate(`/${id}`)
    }
  },[suggestion])
  return (
    <>
    <div className='Search_page'>
        <h3>Search for {searching}...</h3>
        <div className='SearchItem'>
        {suggestion?.map((item,count)=><ItemCards key={count} data={item}/>)}
        </div>
    </div>
    </>
  )
}
