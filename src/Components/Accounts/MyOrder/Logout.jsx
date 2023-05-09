import React from 'react'
import {GrLogout} from 'react-icons/gr'
import '../../../scss/Logout.scss'
export default function Logout() {
  return (
    <>
    <div className='accout_logout'>
        <GrLogout size={25}/>
        <p>Log Out</p>
    </div>
    </>
  )
}
