import React from 'react'
import '../../../scss/LoyalityPoints.scss'
import { useSelector } from 'react-redux'
export default function LoyalityPoints({id}) {
  const userData=useSelector(state=>state.rootReducer.userData.userInfo);
  // useEffect(()=>{

  // },[userData])

  return (
    <>
    <div className='LoyalityPoint'>
        <p>LoyalityPoints</p>
        <p className='coins'>{userData.netLoyaltyPoints}</p>
    </div>
    </>
  )
}
