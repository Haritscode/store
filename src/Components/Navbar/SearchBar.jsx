import { useState, useEffect,useRef } from 'react'
import '../../scss/SearchBar.scss'
import { BiSearchAlt2 } from 'react-icons/bi'
import { AiOutlineFilter } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { searching as searchng } from '../../actions';
import {RxCross2} from 'react-icons/rx'
export default function SearchBar({ inventoryData,id,setSearch,search,setSuggestion,suggestion,setIsSearchFocus,isSearchFocus}) {
  const categoryList=useSelector(state=>state.rootReducer.userData.categoryList)
  const [isFilterClicked, setisFilterClicked] = useState(false);
  const [isSuggestionClicked,setIsSuggestionClicked]=useState(false);
  const ref=useRef()
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {
    if (search !== "") {
      let data = [];
      inventoryData.map((item) => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          data.push(item)
        }
      })
      setSuggestion(data);
    }
    else{
      setSuggestion([])
    }
  }, [search])
  const filterBtn=()=>{
    setisFilterClicked(!isFilterClicked);
  }
  const onKeyPress=(e)=>{
    if(e.key==="Escape")
    {
      setIsSearchFocus(false);
      ref.current.blur()
    }
    else{
      setIsSearchFocus(true)
    }
    if(e.key=="Enter")
    {
      dispatch(searchng(search))
      setIsSearchFocus(false)
      ref.current.blur()
      navigate(`/${id}/search`)
    }
  }
  const suggestionClicked=(item)=>{
    setSearch(item.name)
    setIsSuggestionClicked(true);
    setIsSearchFocus(false)
    dispatch(searchng(search))
    navigate(`/${id}/search`)
  }
  const searching=(e)=>{
    setSearch(e.target.value);
    setIsSuggestionClicked(false);
  }
  const closeSearch=()=>{
    setIsSearchFocus(false);
    setSearch("");
  }
  const Blur=()=>{
    {
      setTimeout(()=>{
        setIsSearchFocus(false)
        setisFilterClicked(false)
      },100)
    }
  }
  return (
    <div className='search' onBlur={Blur}>
      <div className='SearchBar'>
        <BiSearchAlt2 size={20} id="search_icon" />
        <input ref={ref} placeholder='Search here...' type="text" onChange={searching} onFocus={() => setIsSearchFocus(true)} value={search} onKeyDown={onKeyPress}/>
        <div className='searchBar_right'>
          {isSearchFocus?<button id="filter_icon" onClick={closeSearch}><RxCross2 size={20}/></button>:""}
          <button id="filter_icon" onClick={filterBtn}>
            {isFilterClicked?<RxCross2 size={20}/>:<AiOutlineFilter size={20}/>}
          </button>
        </div>
      </div>
      <ul className='search_suggestion'>
        {search.length > 2 && isSearchFocus && !isSuggestionClicked ? suggestion.length>0?suggestion.map((item, count) => <li className='search_suggestion_item' key={count} onClick={()=>suggestionClicked(item)}>
          <div className='search_suggestion_data'>
            <p>{item.name}</p>
          </div>
        </li>):<li className='search_suggestion_item'>Item Not Found</li> : ""}
      </ul>
      <ul className='categories' style={isFilterClicked?{display:"flex"}:{display:"none"}} onBlur={()=>setisFilterClicked(false)} >
        {
          categoryList.map((item,count)=><Link key={count} to={`/${id}/category/${item}`}><li className='category_list' onClick={()=>setisFilterClicked(false)} key={count}>{item}</li></Link>)
        }
      </ul>
    </div>
  )
}
