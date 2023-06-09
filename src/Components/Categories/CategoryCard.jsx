import {useRef} from 'react';
import '../../scss/categoriesCard.scss';
import substituteimg from '../../assets/e-commerce-cart-shop-online-concept-vector-illustration-eps-80643946.jpg'
export default function CategoryCard({data}) {
  let name="";
  if(data.categoryName==='All Products')
  {
    name=data.categoryName;
  }
  else{
    name=data?.categoryName.split(" ")[0];
  }
  const imageref=useRef()
  const substituteImage=()=>{
    imageref.current.src=substituteimg
  }
  return (
    <>
    <div className='Category_card'>
      <img className='category_img' src={data.categoryImage} alt="sorry!" onError={substituteImage} ref={imageref} />
      <p className='category_name'>{name}</p>
    </div>
    </>
  )
}
