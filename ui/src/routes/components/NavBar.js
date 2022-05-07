import { Link } from "react-router-dom";
import {Component} from "react";
import { useState } from 'react';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SigninPopup from './SigninPopup';
import LoginPopup from './LoginPopup';
import './NavBar.css';
import userSVG from './img/user-solid.svg';
import downArrow from './img/sort-down-solid.svg';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(event) {
        localStorage.clear();
    }

    render() {
        if (this.props.role)
            return (<NavBarUser role={this.props.role} log={this.logout}/>);
        else
            return (<NavBarNoUser />);

    }
}


const NavBarNoUser = function() {
  const [btnLoginPopup, setBtnLoginPopup] = useState(false);
  const [btnSignPopup, setBtnSignPopup] = useState(false);
  return (
        <div>
          <button class="login" onClick={()=> setBtnLoginPopup(true)}>Inicia Sesión</button>
          <button class="signin" onClick={()=> setBtnSignPopup(true)}><a class="signin-text">Regístrate</a></button>
  
        <LoginPopup trigger={btnLoginPopup} >
          <a className="x2-btn" onClick={()=> setBtnLoginPopup(false)}><FontAwesomeIcon icon={faX} /></a>
          <h3>Inicia Sesión en Untutor</h3>
        </LoginPopup>

        <SigninPopup trigger={btnSignPopup}>
          <a className="x2-btn" onClick={()=> setBtnSignPopup(false)}><FontAwesomeIcon icon={faX} /></a>
          <h3>Únete ahora</h3>
        </SigninPopup>
        </div>
  );
}

const NavBarUser = function({role, log}) {
  return (
    <nav>
      <div class="dropdown">
        <button className="userSVG"><img src={userSVG} className="userSVG-img" /><img src={downArrow} className="downArrow-img" /></button>
        <div className="dropdown-content">
          <Link to={'/' + role}><a className="miArea">Mi Area</a></Link>
          <br></br>
          <Link to='/'><a className="inicio">inicio</a></Link>
          <div className="line"></div>
          <form className="cerrar" method='post' action='/api/logout'>
            <input className="cerrar-btn" type='submit' value='Cerrar sesión'/>
          </form>
        </div>
      </div>
      
      
    </nav>
  );
}

export default NavBar;

