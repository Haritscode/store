import { useEffect, useState } from 'react'
import { IoNotificationsSharp } from 'react-icons/io5'
import { FaCoins } from 'react-icons/fa'
import "../../scss/Navbar.scss"
import { useDispatch, useSelector } from 'react-redux'
import dataScrape from '../../handles/SearchItems'
import { BiHomeAlt } from 'react-icons/bi';
import { BsCart2 } from 'react-icons/bs';
import { BsCart3 } from "react-icons/bs"
import { RiAccountCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import LoginSignUpBtn from '../Buttons/LoginSignUpBtn'
import customerDetails from '../../handles/customerDetails'
import { userInfo,categoryList } from '../../actions'
import SearchBar from './SearchBar'
import retailorInfo from '../../handles/RetailorData'
import StoreLogo from './StoreLogo'
export default function Navbar({setShowRegister,showRegister,setSearch,search,setSuggestion,suggestion,setIsSearchFocus,isSearchFocus}) {
    const id = useSelector(state => state.rootReducer.userData.retailorId);
    const userdata = useSelector(state => state.rootReducer.userData.userInfo);
    const cartData=useSelector(state=>state.rootReducer.userData.cartData);
    const userId=useSelector(state=>state.rootReducer.userData.userId);
    const retialordata=useSelector(state=>state.rootReducer.userData.retailorData)
    const [userinfo, setUserData] = useState({});
    const dispatch = useDispatch();
    const [inventoryData, setInventoryData] = useState([]);
    const LoggedInUser=useSelector(state=>state.rootReducer.userData.isUserLoggedIn)
    const [data=[],loading,error]=dataScrape(id);
    useEffect(() => {
        if (id !== "") {
            retailorInfo(id,dispatch);
        }
    }, [id]);
    useEffect(()=>{
        if(id.length>0)
        {
            let data=JSON.stringify(cartData)
            localStorage.setItem(id,data);
        }
    },[cartData])
    useEffect(()=>{
        if(LoggedInUser)
        {
            if(id.length>0)
            {
                customerDetails(id,userId,setUserData);
            }
        }
    },[userId,id,LoggedInUser])
    useEffect(() => {
        if (userinfo?.customerId!=="") {
            dispatch(userInfo(userinfo));
        }
    }, [userinfo])
    useEffect(()=>{
        let categoryItem=new Set();
        if(!loading)
        {
            setInventoryData(data);
            data.map(item=>categoryItem.add(item.category));
            dispatch(categoryList([...categoryItem]))
        }
    },[loading])
    return (
        <>
            <div className="Navbar">
                <ol className='Navbar_navigations'>
                    <Link to={`/${id}`}><li className='navigation_left'>
                        <StoreLogo storeName={retialordata?.store?.storeName}/>
                    </li>
                    </Link>
                    <li className="navigation_right">
                        <div className='nav_right'>
                            <ol className="nav_right_Left">
                                <li className="nav_right_itm">
                                    <IoNotificationsSharp size={15} />
                                </li>
                                <li className='coins'>
                                    <FaCoins size={15} color="gold" />
                                    <h3>{userdata?.netLoyaltyPoints}</h3>
                                </li>

                            </ol>
                            <div className='vl'></div>
                            {LoggedInUser ? 
                            <ol className='nav_right_Right'>
                                <Link to={`/${id}/orders`}>
                                    <li className="nav_right_itm">
                                        <BsCart3 color="gray" size={20} />
                                    </li>
                                </Link>
                                <Link>
                                    {/* <li className="nav_right_itm">
                                        <RiAccountCircleFill color="gray" size={25} />
                                    </li> */}
                                    <li>{LoggedInUser?<Link to={`/${id}/account`}><RiAccountCircleFill color="black" size="20px" /></Link>:<button onClick={()=>setShowRegister(!showRegister)}><RiAccountCircleFill color="black" size="20px" /></button>}</li>

                                </Link>
                            </ol>:
                            <ol className="when_not_logedIn">
                                {/* <Link to={`/${id}/login`}>
                                    <li><LoginSignUpBtn BtnType="Login" />
                                    </li>
                                </Link> */}
                                <Link to={`/${id}/orders`}>
                                    <li className="nav_right_itm">
                                        <BsCart3 color="gray" size={20} />
                                    </li>
                                </Link>
                                {/* <Link to={`/${id}/register`}> */}
                                <button onClick={()=>setShowRegister(!showRegister)}>
                                    <li>
                                        <LoginSignUpBtn BtnType="SignUp"/>
                                    </li>
                                </button>
                                {/* </Link> */}
                            </ol>}
                        </div>
                    </li>
                </ol>
                <div className="Navbar_searchBar" >
                    <SearchBar inventoryData={inventoryData} id={id} setSearch={setSearch} search={search} setSuggestion={setSuggestion} suggestion={suggestion} setIsSearchFocus={setIsSearchFocus} isSearchFocus={isSearchFocus}/>
                </div>
                <ol className='mobile_navbar'>
                    <li><Link to={`/${id}`}><BiHomeAlt color="black" size="20px" /></Link></li>
                    <li>
                        <Link to={`/${id}/orders`}>
                            <div
                            className='cartData'>
                                <BsCart2
                                color="black"
                                size="20px"/>
                                {cartData.length!=0?<div
                                className='cartData_length'>
                                    <p>{cartData.length}</p>
                                </div>:""}
                            </div>
                        </Link>
                    </li>
                    <li>{LoggedInUser?<Link to={`/${id}/account`}><RiAccountCircleFill color="black" size="20px" /></Link>:<button onClick={()=>setShowRegister(!showRegister)}><RiAccountCircleFill color="black" size="20px" /></button>}</li>
                </ol>
            </div>
        </>
    )
}
