import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import OtpInput from "react18-input-otp";
import 'react-phone-number-input/style.css'
import '../../scss/PhoneNumber.scss'
import { MdVerified } from 'react-icons/md'
import { onSingup, onOTPVerify } from '../../handles/AuthUser'
export default function PhoneNumber({dispatch,state}) {
  const [showOtpInput, setshowOtpInput] = useState(false)
  const [otp,setOtp]=useState("")
  const otpVerification = () => {
    setshowOtpInput(true);
    onSingup(state.phoneNumber);
  }
  const checkVerified=()=>{
    dispatch({type:"VEREFIED"})
    setshowOtpInput(false)
}
  return (
    <>
      <div className='Phone_number_verification'>
        <div className="phone_number">
          <PhoneInput
            defaultCountry="IN"
            value={state.phoneNumber}
            onChange={value => dispatch({type:"PHONENUMBER",payload:value})}
            placeholder="Enter your Phone Number"
          />
          <button
          className="verify_contact"
          onClick={otpVerification}>{!state.verified ? "verify" : <MdVerified fontSize={20}
          />}
          </button>
        </div>
        {showOtpInput?
        <div
          className="opt_input_verify">
          <OtpInput 
          inputStyle={{ width: "2rem", height: "2rem" }}
          className="otp"
          value={otp}
          onChange={inputOtp => setOtp(inputOtp)}
          numInputs={6}
          separator={
          <span
            style={{ margin: '0 0.5rem' }}>
          </span>} />
          <button
            className="verify_otp_btn"
            onClick={() => onOTPVerify(otp, checkVerified)}>
            Check
          </button>
        </div>
        : ""
        }
      </div>
    </>
  )
}
