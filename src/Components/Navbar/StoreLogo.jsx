import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import '../../scss/StoreLogo.scss'
export default function StoreLogo({storeName="Custom Store is Best"}) {
    const isUserLoggedIn=useSelector(state=>state.rootReducer.userData.isUserLoggedIn);
    
    return (
        <div className="logo-container">
            <ul>
                <li>
                    <div className="logo-holder logo-1">
                            <h3>{storeName.split(" ")[0]+" "+storeName.split(" ")[1]}</h3>
                            <p>powered by BEAZY</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
