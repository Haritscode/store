import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard'
import '../../scss/Categorie.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import categoriesList from '../../handles/CategoriesList';
import { useDispatch,useSelector } from 'react-redux';
export default function Category() {
  const id=useSelector(state=>state.rootReducer.userData.retailorId);
  const [data=[],loading,error]=categoriesList(id);
  const dispatch=useDispatch();
  const [category,setCategory]=useState([])
  const [showCategories,setShowCategories]=useState(6);
  const categories=useSelector(state=>state.rootReducer.userData.categoryList);
  console.log(categories);
  useEffect(()=>{
    let categoryItem=new Set();
    if(data?.length>0)
    {
      data?.map((items)=>{
        categories.map((item)=>{
          if(items.categoryName===item){
            categoryItem.add(items)
          }
        })
      })
    }
    setCategory([...categoryItem])
  },[data,categories])
  return (
    <>
    <div className='Categories'>
        <h3 className="Categories_head">
          Shop by category
        </h3>
        <ol className='Categories_list'>
          {
            !loading?category?.map((item,count)=>count<showCategories?<Link key={count} to={`/${id}/category/${item.categoryName}`}><CategoryCard data={item}/></Link>:""):""
          }
        </ol>
        {category?.length>6?<button onClick={()=>showCategories>=data?.length?setShowCategories(6):setShowCategories(showCategories+showCategories)}>{showCategories>=data?.length?
          <div className='category_show_btns_content'>
            <p>Show less</p>
            <KeyboardArrowUpIcon/>
          </div>:
          <div className='category_show_btns_content'>
            <p>Show More</p>
            <KeyboardArrowDownIcon/>
             </div>
        }</button>:""}
    </div>
    </>
  )
}
