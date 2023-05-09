import { useReducer,useEffect, useState } from "react";
import '../scss/Register.scss'
import handleSubmit from "../handles/handleSubmit";
import 'react-phone-number-input/style.css'
import { useDispatch } from "react-redux";
import { userId } from "../actions";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PhoneNumber from "../Components/PhoneNumberInput/PhoneNumber";
const initalState = {
    name: "",
    address: [],
    phoneNumber: "",
    verified:false
}
const Register = (props) => {
    const [rediectNow,setRedirectNow]=useState(false);
    const [submitClicked,setSubmitClicked]=useState(false);
    const dispatcher=useDispatch();
    const {id}=useParams();
    const navigate=useNavigate();
    dispatcher(userId(id))
    useEffect(()=>{
        if(rediectNow)
        {
            navigate(`/${id}/login`)
        }
    },[rediectNow])
    const reducer = (state, action) => {
        switch (action.type) {
            case 'NAME':
                return { ...state, name: action.payload }
            case 'ADDRESS':
                return { ...state, address: [...state.address,action.payload] }
            case 'PHONENUMBER':
                return { ...state, phoneNumber: action.payload }
            case "VEREFIED":
                return {...state,verified:true}
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initalState)
    const onSubmit=()=>{
        setSubmitClicked(true);
        if(state.verified)
        {
            handleSubmit(id,state.phoneNumber,state,setRedirectNow);
            if(localStorage.getItem("atf") && localStorage.getItem('rtf')){
                dispatcher(registereduser(true))
                navigate(`/${id}`)
            }
        }
    }
    return (
        <div className='authenticate_user'>
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="name">Full name</label>
                    <input value={state.name} name="name" onChange={(e) => dispatch({ type: "NAME", payload: e.target.value })} id="name" placeholder="Full Name" />
                    <label htmlFor="name">Full name</label>
                    <input value={state.address} name="address" onChange={(e) => dispatch({ type: "ADDRESS", payload: e.target.value })} id="address" placeholder="Your address Please" />
                    <label htmlFor="name">Full name</label>
                        <PhoneNumber 
                        state={state} 
                        dispatch={dispatch}/>
                        {submitClicked?!isVerified?<p className="notVerified_user">
                            Please verify your phone number
                        </p>:
                        "":
                        ""}
                    <button id="sign_up_button" type="submit" onClick={onSubmit}>Sign Up</button>
                </form>
                <Link to={`/${id}/login`}>Already have an account? Login here.</Link>
            </div>
        </div>
    )
}
export default Register;