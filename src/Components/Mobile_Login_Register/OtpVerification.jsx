import {useState} from 'react'
import '../../scss/OtpVerification.scss'
import {BiRefresh} from 'react-icons/bi'
import InputOtp from './InputOtp'
import handleSubmit from '../../handles/handleSubmit'
import {onOTPVerify } from '../../handles/AuthUser'
import '../../scss/MobileLogin.scss'
import { useDispatch } from 'react-redux'


export default function OtpVerification({id,state}) {
    const dispatcher=useDispatch();
    const [otp,setOtp]=useState("")
    const checkVerified=()=>{
        handleSubmit(id,state.customerMobile,{customerMobile:state.customerMobile},dispatcher)
      }
  return (
    <>
        <div className='otp_verification'>
          <InputOtp otp={otp} setOtp={setOtp}/>
          <div className='otp_verification_btns'>
            <button className='Mobile_login_btn' id="sign_up_button" onClick={()=>onOTPVerify(otp,checkVerified)}>Verify</button>
            <div className='resend_otp'>
              <div></div>
              <button className='Mobile_opt_resend'>
                <BiRefresh/>
                <p>resend otp</p>
              </button>
            </div>
          </div>
        </div>
    </>
  )
}
