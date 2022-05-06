import React from 'react'
import { useState } from 'react';

import Login from '../login';
import './LoginPopup.css'
import SigninPopup from './SigninPopup';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPopup(props) {
  const [btnSignPopup, setBtnSignPopup] = useState(false);

  const [nombre, setNombre] = useState('');
  const getNombre = (event)=>{
    const userNombre = event.target.value;
    //console.log(userNombre);
    setNombre(userNombre)
  };

  const [contra, setContra] = useState('');
  const getContra = (event)=>{
    const userContra = event.target.value;
    //console.log(userContra); 
    setContra(userContra); 
  };

  return (props.trigger) ? (
    
    <div className='login-popup'>
        
        <div className='login-popup-inner'>
            {props.children}
            <Login />
            <p class="message">¿No estás registrado? <a onClick={()=> setBtnSignPopup(true)}>Crea una cuenta</a></p>
        <SigninPopup trigger={btnSignPopup}>
          <a className="x2-btn" onClick={()=> setBtnSignPopup(false)}><FontAwesomeIcon icon={faX} /></a>
          <h3>Deseas registrarte como:</h3>
        </SigninPopup>
        </div>
    </div>
  ) : "";
}

export default LoginPopup