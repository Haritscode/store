import { useEffect } from 'react';
import ItemCards from '../Components/ItemCards'
import '../scss/inventory.scss'
import categoriesData from '../handles/CategoriesData';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { retailorId } from '../actions';
import { checkUserAuth } from '../handles/AuthUser';
import Loader from '../Components/Loading/Loader';
const Inventory = () => {
    const {id,categoryName}=useParams();
    const dispatch=useDispatch();
    dispatch(retailorId(id))  
    const [data=[],loading,error]=categoriesData(id,categoryName);
    useEffect(()=>{
        if(!loading)
        {
            checkUserAuth(dispatch);
        }
    },[loading])
    useEffect(()=>{
        if(data.length!==0)
        {
            checkUserAuth(dispatch);
        }
      },[data]);
    return (
        <>
        {
            loading?<Loader/>:
            <div className='inventory'>
                <div className='inventory_heading'>
                    <h3>{categoryName==="all"?"All Products":categoryName}</h3>
                </div>
                <div className='inventory_data'>
                    {   data?.map((info,count)=><ItemCards key={count} data={info}/>)
                    }
                </div>
            </div>
        }
        </>
    );
}

export default Inventory;
