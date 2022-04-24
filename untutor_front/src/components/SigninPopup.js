import React from 'react'
import { useState } from 'react';
import './SigninPopup.css'
import LoginPopup from './LoginPopup'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSchool from './InputSchool';

function SigninPopup(props) {
    const [btnLoginPopup, setBtnLoginPopup] = useState(false);

    const [nombre, setNombre] = useState('');
    const getNombre = (event)=>{
        const userNombre = event.target.value;
        //console.log(userNombre); 
        setNombre(userNombre);
    };

    const [cedula, setCedula] = useState('');
    const getCedula = (event)=>{
        const userCedula = event.target.value;
        //console.log(userCedula);
        setCedula(userCedula); 
    };

    const [email, setEmail] = useState('');
    const getEmail = (event)=>{
        const userEmail = event.target.value;
        //console.log(userEmail);
        setEmail(userEmail); 
    };

    const [contra, setContra] = useState('');
    const getContra = (event)=>{
        const userContra = event.target.value;
        //console.log(userContra);
        setContra(userContra);

    };

    const [rol, setRol] = useState('');
    const getRol = (event)=>{
        const userRol = event.target.value;
        //console.log(userRol);
        setRol(userRol); 
    };

    function esEst(){
        if(rol==="Estudiante"){
            return true
        }else{return false}
    }
  return (props.trigger) ? (
    
    <div className='signin-popup'>
        
        <div className='signin-popup-inner'>
            {props.children}
            <input type="text" onChange={getNombre} placeholder="nombres y apellidos"/>
            <input type="text" onChange={getCedula} placeholder="cédula"/>
            <input type="text" onChange={getEmail} placeholder="correo electrónico"/>
            <input type="password" onChange={getContra} placeholder="contraseña"/>
            
            <select className='selection' id='selectionid' onChange={getRol}>
                <option value="">Seleccionar Rol</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Tutor">Tutor</option>
            </select>
            <InputSchool trigger={esEst()}>
                
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