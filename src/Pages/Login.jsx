import React, { useState } from "react";
import '../scss/Login.scss'
import {onLoginVerification} from '../handles/AuthUser'
import { Link, useParams } from "react-router-dom";
const Login = (props) => {
    const [number, setNumber] = useState('');
    const [otp, setOTP] = useState('');
    const {id}=useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='authenticate_user'>
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="number">Phone Number</label>
                <input value={number} onChange={(e) => setNumber(e.target.value)}type="text" placeholder="Enter your Phone Number" id="number" name="number" />
                <label htmlFor="otp">OTP</label>
                <input value={otp} onChange={(e) => setOTP(e.target.value)} type="otp" placeholder="****" id="otp" name="otp" />
                <button type="submit" id="sign_up_button" onClick={()=>onLoginVerification(number)}>Log In</button>
            </form>
            <Link to={`/${id}/register`}>Don't have an account? Register here.</Link>
        </div>
        </div>
    )
}
export default Login;