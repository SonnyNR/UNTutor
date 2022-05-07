import React from 'react'
import { useState } from 'react';
import './SigninPopup.css'
import LoginPopup from './LoginPopup'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Register from '../Register';
import Login from '../Login';

function SigninPopup(props) {
    const [btnLoginPopup, setBtnLoginPopup] = useState(false);
  return (props.trigger) ? (
    
    <div className='signin-popup'>
        
        <div className='signin-popup-out'>
            {props.children}
            <Register />
            <p class="message">¿Ya estas registrado? <a onClick={()=> setBtnLoginPopup(true)}>Inicia sesión</a></p>
            <LoginPopup trigger={btnLoginPopup} >
                <a className="x2-btn" onClick={()=> setBtnLoginPopup(false)}><FontAwesomeIcon icon={faX} /></a>
                <h3>Inicia Sesión en Untutor</h3>
            </LoginPopup>
        </div>
        
    </div>
  ) : "";
}

export default SigninPopup