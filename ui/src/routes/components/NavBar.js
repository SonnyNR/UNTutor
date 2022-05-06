import { Link } from "react-router-dom";
import { useState } from 'react';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SigninPopup from './SigninPopup';
import LoginPopup from './LoginPopup';
import logo from './logo.svg';
import './NavBar.css'

const NavBar = ({role}) => {
  
  if (role)
    return (<NavBarUser role={role} />);
  else
    return (<NavBarNoUser />);
}

const NavBarNoUser = function() {
  const [btnLoginPopup, setBtnLoginPopup] = useState(false);
  const [btnSignPopup, setBtnSignPopup] = useState(false);
  return (
    <body>
      <div class="wrapper">
      <header>
        <div class="untutorlogo">
          <a id="logo" href="#"><img src={logo} className="App-logo" alt="logo" /></a>
        </div> 
      
        <nav class="main-nav">                   
        </nav>

        <nav class="sub-nav">
          <button class="login" onClick={()=> setBtnLoginPopup(true)}>Inicia Sesión</button>
          <button class="signin" onClick={()=> setBtnSignPopup(true)}><a class="signin-text">Regístrate</a></button>
  
        </nav> 
      </header>
      <LoginPopup trigger={btnLoginPopup} >
        <a className="x2-btn" onClick={()=> setBtnLoginPopup(false)}><FontAwesomeIcon icon={faX} /></a>
        <h3>Inicia Sesión en Untutor</h3>
      </LoginPopup>

      <SigninPopup trigger={btnSignPopup}>
      <a className="x2-btn" onClick={()=> setBtnSignPopup(false)}><FontAwesomeIcon icon={faX} /></a>
        <h3>Únete ahora</h3>
      </SigninPopup>
      
      <section class="main-container" >
      <div class="location" id="home">
          <h1 id="home">Aún no hay cursos disponibles</h1>
          <div class="box">
          </div>
      </div>
      </section>

      </div>
    </body>
  );
}

const NavBarUser = function({role}) {
  return (
    <nav>
      <Link to={'/' + role}>Mi Area</Link>
      <br/>
      <Link to='/'>Inicio</Link>
      <br/>
      <br/>
      <form method='post' action='/api/logout'>
        <input type='submit' value='Cerrar sesión'/>
      </form>
    </nav>
  );
}

export default NavBar;

