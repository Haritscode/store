import {useEffect} from 'react'
import '../../scss/Account.scss';
import AccountCard from './AccountCard';
import { HiMenu } from 'react-icons/hi'
import {FaCoins} from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa'
import {GrLogout} from 'react-icons/gr'
import {TbLocationFilled} from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, retailorId, userId } from '../../actions';
import { checkUserAuth, signOutUser } from '../../handles/AuthUser';
const items=[
  {
    icon:<HiMenu size="25"/>,
    name:"MyOrders",
    right_icon:<FaArrowAltCircleRight size="25"/>
  },
  {
    icon:<FaCoins size="25"/>,
    name:"My Loyality Points",
    right_icon:<FaArrowAltCircleRight size="25"/>
  },
  {
    icon:<TbLocationFilled size="25"/>,
    name:"My Addresses",
    right_icon:<FaArrowAltCircleRight size="25"/>
  }
  ]
export default function Account() {
  const userData=useSelector(state=>state.rootReducer.userData.userInfo)
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData)
  const userid=useSelector(state=>state.rootReducer.userData.userId)
  const isLoggedIn=useSelector(state=>state.rootReducer.userData.isUserLoggedIn)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  dispatch(retailorId(id))
  useEffect(()=>{
    if(userid==="" && isLoggedIn)
    {
      let uid=`+91${localStorage.getItem("uid")}`
      dispatch(userId(uid))
    }
  },[userId])
  useEffect(()=>{
    dispatch(retailorId(id))
  },[])
  useEffect(() => {
    if (userData.name) {
      dispatch(userInfo(userData))
    }
  }, [userData])
  
  useEffect(()=>{
    checkUserAuth(dispatch);
  },[retailorData])

const OnLogOut=()=>{
  signOutUser(dispatch);
  localStorage.clear()
  dispatch(userInfo({}))
  navigate(`/${id}`)
}
  return (
    <>
    <div className='Account'>
        <ol className='Account_header'>
            <li><p className='account_User'>Account</p></li>
            <li><p className='account_number'>+91-{userid.slice(3)}</p></li>
        </ol>
        <ol className='Account_body'>
          { items?.map(({icon,name,right_icon},count)=><li><AccountCard key={count} id={id} icon={icon} name={name} right_icon={right_icon}/></li>)}
          <li className='accout_logout'>
            <button className='logout_btn' onClick={OnLogOut}>
              <GrLogout size={20}/>
              <p>Log Out</p>
            </button>
          </li>
        </ol>
    </div>
    </>
  )
}
