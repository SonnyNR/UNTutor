import React, { Component } from 'react';
import axios from 'axios';
import './client.js';
import NavBar from './routes/components/NavBar';
import logo from './routes/components/img/logo.svg';
import './App.css';
import { Link } from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      role: localStorage.getItem('role'),
    };

    this.setRole = this.setRole.bind(this);
  }


  setRole(role){
    console.log(role);
    localStorage.setItem('role', role);
    this.setState({role});
  }

  render() {
    return(
    <body>
      <div className='wrapper'>
        <header>
          <Link to='/'>
            <div class="untutorlogo">
              <a id="logo"><img src={logo} className="App-logo" alt="logo" /></a>
            </div>
          </Link>
          
          <NavBar role={this.state.role}/>
          
        </header>
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

  componentDidMount() {
    window.client.getRole(this.setRole);
  }

}

export default App;
