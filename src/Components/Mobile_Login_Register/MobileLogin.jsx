import CloseIcon from '@mui/icons-material/Close';
import { useReducer, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../scss/MobileLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { onLoginVerification, onOTPVerify } from "../../handles/AuthUser";
import { useNavigate } from "react-router-dom";
import InputOtp from "./InputOtp";
import handleSubmit from "../../handles/handleSubmit";
import Timer from "./Timer";
const initalState = {
  phoneNumber: "",
  isVerified: false,
};
export default function MobileLogin({setShowRegister}) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "PHONENUMBER":
        return { ...state, customerMobile: action.payload };
      case "ISVERIFIED":
        return { ...state, isVerified: true };
      default:
        return state;
    }
  };
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [state, dispatch] = useReducer(reducer, initalState);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const id = useSelector((state) => state.rootReducer.userData.retailorId);
  const [uid, setUid] = useState("");
  const isUserLoggedIn = useSelector(
    (state) => state.rootReducer.userData.isUserLoggedIn
  );
  const [canresendClickable, setcanresendClickable] = useState(false);
  const [resend, setResend] = useState(false);
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(`/$id}`);
    }
  }, [isUserLoggedIn]);
  useEffect(() => {
    setInterval(() => {}, 1000);
  }, [otpSent]);
  const checkVerified = () => {
    handleSubmit(
      id,
      state.customerMobile,
      { customerMobile: state.customerMobile },
      dispatcher
    );
  };
  return (
    <>
      <div className="Mobile_login">
        <div className="Mobile_login_main">
          <form className="login_form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="logintext">{!otpSent ? "Sign In" : "verify Otp"}</h2>
            {!otpSent ? (
              <>
                <PhoneInput
                  defaultCountry="IN"
                  value={state.customerMobile}
                  onChange={(value) =>
                    dispatch({ type: "PHONENUMBER", payload: value })
                  }
                  placeholder="Enter your Phone Number"
                />
                <button
                  onClick={() =>
                    onLoginVerification(
                      id,
                      state.customerMobile,
                      setOtpSent,
                      setUid
                    )
                  }
                  className="Mobile_login_btn"
                  id="sign_up_button"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <InputOtp otp={otp} setOtp={setOtp} />
                <button
                  className="Mobile_login_btn"
                  onClick={() => onOTPVerify(otp, checkVerified)}
                >
                  Verify
                </button>
                <Timer
                  setcanresendClickable={setcanresendClickable}
                  canresendClickable={canresendClickable}
                  setResend={setResend}
                  state={state}
                />
              </>
            )}
          </form>
          <button onClick={()=>setShowRegister(false)} className='Login_close_btn'>
            <CloseIcon/>
          </button>
        </div>
      </div>
    </>
  );
}
