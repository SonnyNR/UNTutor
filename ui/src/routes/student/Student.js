import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";

import logo from '../components/img/logo.svg';
import './student.css';
import { Link } from "react-router-dom";

class Student extends Component {

  constructor(props) {
    super(props);

      this.state = {
          name: "",
          email: "",
          phone: "",
      }

  }

  render() {

    return (
      <div className='wrapper'>
        <header>
          <Link to='/'>
            <div class="untutorlogo">
              <a id="logo"><img src={logo} className="App-logo" alt="logo" /></a>
            </div>
          </Link>
          <NavBar role='tutor' />
        </header>

        <div className='area-text'>
          <h2>Area Estudiante</h2>
        <h3>Información personal</h3>
        <PersonalData
          name={this.state.name}
          email={this.state.email}
          phone={this.state.phone}
        />
        <h3>Sesiones programadas</h3>
        </div>
        
      </div>
    );
  }

  componentDidMount() {
      let user = JSON.parse(localStorage.user);
      this.setState({
          name: user.name,
          email: user.email,
          phone: user.phone,
      })
  }
}

export default Student;
