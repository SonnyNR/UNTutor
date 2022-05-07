import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";
import Topic from "./Topic";
import logo from '../components/img/logo.svg';
import './tutor.css';
import { Link } from "react-router-dom";

class Tutor extends Component {

  constructor(props) {
    super(props);

      this.state = {
          name: "",
          email: "",
          phone: "",
      }

    this.setData = this.setData.bind(this);

  }

  setData({name, email, phone}) {
    this.setState({
      name,
      email,
      phone,
    })
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
          <h2>Area Tutor</h2>
          <h3>Información personal</h3>
          <PersonalData
            name={this.state.name}
            email={this.state.email}
            phone={this.state.phone}
          />
          <Topic />
          <h3>Sesiones programadas</h3>
          <h3>Exámenes programados</h3>
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

export default Tutor;
