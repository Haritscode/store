import React, { useState, useRef, useEffect } from 'react'
import {BiRefresh} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp } from '../../actions';
import {  onSingup } from '../../handles/AuthUser';

const Timer = ({setcanresendClickable,canresendClickable,state}) => {

	// We need ref in this, because we are dealing
	// with JS setInterval to keep track of it and
	// stop it when needed
	const dispatch=useDispatch();
	const Ref = useRef(null);
	const sendOtp=useSelector(state=>state.rootReducer.userData.resendOtp)
	// The state for our timer
	const [timer, setTimer] = useState('00:60');


	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		return {
			total, minutes, seconds
		};
	}


	const startTimer = (e) => {
		let { total, minutes, seconds }
					= getTimeRemaining(e);
		if (total >= 0) {

			setTimer(
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
        else{
            setcanresendClickable(true)
        }
	}
	const clearTimer = (e) => {

		setTimer('00:60');

		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);

		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();

		deadline.setSeconds(deadline.getSeconds() + 60);
		return deadline;
	}
	useEffect(() => {
		clearTimer(getDeadTime());
	}, []);
	const onClickReset = () => {
		clearTimer(getDeadTime());
	}
    const otpResend=()=>{
		onSingup(state.customerMobile,"",true)
        dispatch(resendOtp(true));
        onClickReset();
        setcanresendClickable(false)
    }
	return (
        <div className='resend_otp'>
			<h2>{timer}</h2>
            <button  disabled={!canresendClickable} id="sign_up_button" className='resend_otp_btn' onClick={otpResend} style={canresendClickable?{color:'green'}:{color:'gray'}}>
                <BiRefresh/>
                <p>resendOtp</p>
            </button>
        </div>
			// <button onClick={onClickReset}>Reset</button>
	)
}

export default Timer;
