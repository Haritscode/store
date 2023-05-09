import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../scss/disablePage.css"

export default function DisablePage() {
  const retailorData=useSelector(state=>state.rootReducer.userData.retailorData);
  return (
    <div class="container">
      <h2>Oops! Store is Inactive now.</h2>
      
        {retailorData?.storeFront?.storeFrontActive?"":<p>{retailorData?.storeFront?.messageWhenInactive}</p>}
    </div>
  )
}
