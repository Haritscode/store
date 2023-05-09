import { useEffect } from 'react';
import ItemCards from '../Components/ItemCards'
import '../scss/inventory.scss'
import categoriesData from '../handles/CategoriesData';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { retailorId, userId } from '../actions';
import { checkUserAuth } from '../handles/AuthUser';
const Inventory = () => {
    const {id,categoryName}=useParams();
    const dispatch=useDispatch();
    dispatch(userId(id))
    const [data=[],loading,error]=categoriesData(id,categoryName);
    useEffect(()=>{
        if(!loading)
        {
            dispatch(retailorId(id))
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
            <div className='inventory'>
                {/* {loading?<div className='inventory_loading'>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                    <ItemCardShimmer/>
                </div> */}
                      {/* <Category id={id}/> */}
                    <div className='inventory_heading'>
                        <h3>{categoryName}</h3>
                    </div>
                <div className='inventory_data'>
                    {   data?.map((info,count)=><ItemCards key={count} data={info}/>)
                    }
                </div>
            </div>
        </>
    );
}

export default Inventory;
