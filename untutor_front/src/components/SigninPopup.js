import React from 'react'
import { useState } from 'react';
import './SigninPopup.css'
import LoginPopup from './LoginPopup'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSchool from './InputSchool';

function SigninPopup(props) {
    const [btnLoginPopup, setBtnLoginPopup] = useState(false);

    const getName = (event)=>{
        const userName = event.target.value;
        alert(userName); 

    };

    const getId = (event)=>{
        const userId = event.target.value;
        console.log(userId); 
    };
    const getEmail = (event)=>{
        const userEmail = event.target.value;
        console.log(userEmail); 
    };

    const getPass = (event)=>{
        const userPass = event.target.value;
        console.log(userPass); 
    };

    const isStudent = true;
    const getRol = (event)=>{
        var isS;
        var userSelect = "Estudiante"
        userSelect = event.target.value;
        if (userSelect==="Estudiante"){
            isS = true;
        }else{
            isS = false;
        }
        console.log(userSelect);
        isStudent = isS;
        console.log(isStudent);
    };
    

  return (props.trigger) ? (
    
    <div className='signin-popup'>
        
        <div className='signin-popup-inner'>
            {props.children}
            <input type="text" onChange={getName} placeholder="nombres y apellidos"/>
            <input type="text" onChange={getId} placeholder="cédula"/>
            <input type="text" onChange={getEmail} placeholder="correo electrónico"/>
            <input type="password" onChange={getPass} placeholder="contraseña"/>
            
            <select className='selection' onChange={getRol}>
                <option value="Estudiante">Estudiante</option>
                <option value="Tutor">Tutor</option>
            </select>
            <InputSchool trigger={true}>
                
            </InputSchool>

            <button>Registrar</button>
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