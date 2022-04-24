import React from 'react'
import { useState } from 'react';

import './LoginPopup.css'
import SigninPopup from './SigninPopup';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPopup(props) {
  const [btnSignPopup, setBtnSignPopup] = useState(false);

  const getName = (event)=>{
    const userName = event.target.value;
    console.log(userName); 

  };
  const getPass = (event)=>{
    const userName = event.target.value;
    console.log(userName); 

  };

  return (props.trigger) ? (
    
    <div className='login-popup'>
        
        <div className='login-popup-inner'>
            {props.children}
            <input type="text" onChange={getName} placeholder="correo"/>
            <input type="password" onChange={getPass} placeholder="contraseña"/>
            <button>Iniciar Sesión</button>
            <p class="message">¿No estás registrado? <a onClick={()=> setBtnSignPopup(true)}>Crea una cuenta</a></p>
        </div>
        <SigninPopup trigger={btnSignPopup}>
          <a className="x2-btn" onClick={()=> setBtnSignPopup(false)}><FontAwesomeIcon icon={faX} /></a>
          <h3>Deseas registrarte como:</h3>
        </SigninPopup>
    </div>
  ) : "";
}

export default LoginPopup