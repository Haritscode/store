import React from 'react';
import '../../scss/LoginSingUpBtn.scss'
const LoginSignUpBtn = ({BtnType}) => {
    return (
        <div className='authbtn'>
            {BtnType}
        </div>
    );
}

export default LoginSignUpBtn;
