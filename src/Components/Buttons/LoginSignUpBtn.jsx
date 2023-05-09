import React from 'react';
import '../../scss/LoginSingUpBtn.scss'
const LoginSignUpBtn = ({BtnType}) => {
    return (
        <button className='authbtn'>
            {BtnType}
        </button>
    );
}

export default LoginSignUpBtn;
