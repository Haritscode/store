import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard'
import '../../scss/Categorie.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import allProductImage from '../../assets/2633da06590d107e0ab30178022253f8-grocery-store-store-online.webp'
import InventoryData from '../../handles/InventoryData';
const AllCategories={
  categoryImage:allProductImage,
  categoryName:"All Products"
}
export default function Category({categoryData,categoryLoading,id}) {
  const [inventoryData=[],inventoryLoading,inventoryLoadingError]=InventoryData(id);
  const [categoryList,setCategoryList]=useState([]);
  const [category,setCategory]=useState([])
  const [showCategories,setShowCategories]=useState(6);
  useEffect(()=>{
    let categoryItem=new Set();
    if(!inventoryLoading)
    {
      inventoryData.map((item)=>{
        categoryItem.add(item.category);
      })
    }
    setCategoryList([...categoryItem])
  },[inventoryLoading])
  useEffect(()=>{
    let categiestData=new Set();
      if(!categoryLoading && categoryList.length>0)
      {
        categoryData?.map(item=>{
          categoryList?.map(list=>{
            if(item.categoryName===list)
            {
              categiestData.add(item);
            }
          })
        })
      }
    setCategory([...categiestData])
  },[categoryLoading,categoryList])

  return (
    <>
    <div className='Categories'>
        <h3 className="Categories_head">
          Shop by category
        </h3>
        <ol className='Categories_list'>
          <Link className='category_link' to={`/${id}/category/all`}><li><CategoryCard data={AllCategories}/></li></Link>
          {
            !categoryLoading?category?.map((item,count)=>count<showCategories?<Link className='category_link' key={count} to={`/${id}/category/${item.categoryName}`}><li><CategoryCard data={item}/></li></Link>:""):""
          }
        </ol>
        {category?.length>6?<button onClick={()=>showCategories>=category?.length?setShowCategories(6):setShowCategories(showCategories+showCategories)}>{showCategories>=category?.length?
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
