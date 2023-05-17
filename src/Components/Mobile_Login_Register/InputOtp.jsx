import OtpInput from 'react18-input-otp'
import '../../scss/InputOtp.scss'

export default function InputOtp({otp,setOtp}) {
  return (
    <>
    <OtpInput 

          inputStyle={{ width: "2rem", height: "2rem" }}
          className="otp"
          value={otp}
          onChange={inputOtp => setOtp(inputOtp)}
          numInputs={6}
          isInputNum={true}
          separator={
          <span
            style={{ margin: '0 0.5rem'  }}>
          </span>} />

    </>
  )
}
